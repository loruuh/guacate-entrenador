require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Initialize clients
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Paths
const VOCAB_FILE = path.join(__dirname, '..', 'data', 'vocabulario-es.json');
const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');

// Configuration
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // ms
const RATE_LIMIT_DELAY = 100; // ms between vocab items

// Helper: Sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Retry logic
async function retryAsync(fn, attempts = RETRY_ATTEMPTS) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts - 1) throw error;
      console.log(`  ⚠️  Retry ${i + 1}/${attempts - 1}...`);
      await sleep(RETRY_DELAY);
    }
  }
}

// Generate sentence via Claude API
async function generateSentence(vocab) {
  const prompt = `Generiere einen einfachen spanischen Beispielsatz (Niveau A2-B1) mit dem Wort "${vocab.spanish}".

Anforderungen:
- 6-10 Wörter
- Alltagsrelevant
- Grammatikalisch korrekt

Gib mir die Antwort in diesem JSON Format:
{
  "sentence_es": "Der spanische Satz hier",
  "sentence_de": "Die deutsche Übersetzung hier",
  "word_translations": {
    "palabra1": "Wort1",
    "palabra2": "Wort2"
  }
}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  // Extract JSON from response
  const content = response.content[0].text;
  const jsonMatch = content.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error('No JSON found in Claude response');
  }

  return JSON.parse(jsonMatch[0]);
}

// Generate audio via Google TTS (using API Key)
async function generateAudio(text, outputPath) {
  const apiKey = process.env.GOOGLE_CLOUD_TTS_API_KEY;

  const response = await axios.post(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    {
      input: { text },
      voice: {
        languageCode: 'es-ES',
        name: 'es-ES-Standard-A'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.85
      }
    }
  );

  const audioContent = Buffer.from(response.data.audioContent, 'base64');
  await fs.writeFile(outputPath, audioContent);
}

// Process single vocabulary item
async function processVocabulary(vocab, index, total) {
  console.log(`\n[${index + 1}/${total}] Processing: ${vocab.spanish} (ID: ${vocab.id})`);

  try {
    // Generate sentence with Claude
    console.log('  📝 Generating sentence...');
    const sentenceData = await retryAsync(() => generateSentence(vocab));

    // Generate audio with Google TTS
    console.log('  🔊 Generating audio...');
    const audioPath = path.join(AUDIO_DIR, `${vocab.id}.mp3`);
    await retryAsync(() => generateAudio(sentenceData.sentence_es, audioPath));

    // Update vocab object
    vocab.sentence_es = sentenceData.sentence_es;
    vocab.sentence_de = sentenceData.sentence_de;
    vocab.audio = `/audio/${vocab.id}.mp3`;
    vocab.word_translations = sentenceData.word_translations;

    console.log(`  ✅ Success!`);
    return { success: true, vocab };

  } catch (error) {
    console.log(`  ❌ Failed: ${error.message}`);
    return { success: false, id: vocab.id, error: error.message };
  }
}

// Main function
async function main() {
  console.log('🚀 Starting content generation\n');
  console.log('📋 Configuration:');
  console.log(`   - Claude API Key: ${process.env.ANTHROPIC_API_KEY ? '✓ Set' : '✗ Missing'}`);
  console.log(`   - Google TTS API Key: ${process.env.GOOGLE_CLOUD_TTS_API_KEY ? '✓ Set' : '✗ Missing'}`);
  console.log('');

  // Validate environment
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set');
  }
  if (!process.env.GOOGLE_CLOUD_TTS_API_KEY) {
    throw new Error('GOOGLE_CLOUD_TTS_API_KEY environment variable is not set');
  }

  // Create audio directory if it doesn't exist
  await fs.mkdir(AUDIO_DIR, { recursive: true });
  console.log(`✓ Audio directory ready: ${AUDIO_DIR}\n`);

  // Load vocabulary
  const vocabData = JSON.parse(await fs.readFile(VOCAB_FILE, 'utf-8'));
  console.log(`✓ Loaded ${vocabData.length} total vocabulary items`);

  // Separate items by status
  const needsSentence = vocabData.filter(vocab => !vocab.sentence_es);
  const needsAudio = [];

  // Check which items need audio regeneration
  for (const vocab of vocabData) {
    if (vocab.sentence_es) {
      const audioPath = path.join(AUDIO_DIR, `${vocab.id}.mp3`);
      try {
        await fs.access(audioPath);
        // File exists, skip
      } catch {
        // File doesn't exist, needs audio
        needsAudio.push(vocab);
      }
    }
  }

  console.log(`✓ ${needsSentence.length} items need sentences + audio`);
  console.log(`✓ ${needsAudio.length} items need audio regeneration`);
  console.log(`🎯 ${needsSentence.length + needsAudio.length} total items to process\n`);

  if (needsSentence.length === 0 && needsAudio.length === 0) {
    console.log('✅ Nothing to do!');
    return;
  }

  console.log('─'.repeat(60));

  const failed = [];
  const startTime = Date.now();

  // First, process items that need sentences (generates sentence + audio)
  for (let i = 0; i < needsSentence.length; i++) {
    const vocab = needsSentence[i];
    const result = await processVocabulary(vocab, i, needsSentence.length + needsAudio.length);

    if (!result.success) {
      failed.push({ id: result.id, error: result.error });
    }

    // Rate limiting
    if (i < needsSentence.length - 1 || needsAudio.length > 0) {
      await sleep(RATE_LIMIT_DELAY);
    }
  }

  // Then, regenerate audio for items that already have sentences
  for (let i = 0; i < needsAudio.length; i++) {
    const vocab = needsAudio[i];
    const overallIndex = needsSentence.length + i;
    const total = needsSentence.length + needsAudio.length;

    console.log(`\n[${overallIndex + 1}/${total}] Regenerating audio: ${vocab.spanish} (ID: ${vocab.id})`);

    try {
      console.log('  🔊 Generating audio...');
      const audioPath = path.join(AUDIO_DIR, `${vocab.id}.mp3`);
      await retryAsync(() => generateAudio(vocab.sentence_es, audioPath));

      // Update audio path in vocab
      vocab.audio = `/audio/${vocab.id}.mp3`;

      console.log(`  ✅ Success!`);
    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
      failed.push({ id: vocab.id, error: error.message });
    }

    // Rate limiting
    if (i < needsAudio.length - 1) {
      await sleep(RATE_LIMIT_DELAY);
    }
  }

  // Save updated vocabulary (includes both processed and unprocessed items)
  console.log('\n' + '─'.repeat(60));
  console.log('\n💾 Saving updated vocabulary file...');
  await fs.writeFile(VOCAB_FILE, JSON.stringify(vocabData, null, 2), 'utf-8');
  console.log('✓ Saved!\n');

  // Summary
  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
  const totalProcessed = needsSentence.length + needsAudio.length;
  const successCount = totalProcessed - failed.length;

  console.log('═'.repeat(60));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(60));
  console.log(`📚 Total vocabulary items: ${vocabData.length}`);
  console.log(`📝 Items needing sentences: ${needsSentence.length}`);
  console.log(`🔊 Items needing audio: ${needsAudio.length}`);
  console.log(`🎯 Total processed: ${totalProcessed}`);
  console.log(`✅ Successfully processed: ${successCount}/${totalProcessed}`);
  console.log(`❌ Failed: ${failed.length}/${totalProcessed}`);
  console.log(`⏱️  Duration: ${duration} minutes`);
  console.log('');

  if (failed.length > 0) {
    console.log('⚠️  Failed IDs:');
    failed.forEach(f => {
      console.log(`   - ID ${f.id}: ${f.error}`);
    });
    console.log('');
  }

  console.log('✅ Done! Generated sentences and audio files.');
  console.log('');

  // Exit with error code if there were failures
  if (failed.length > 0) {
    process.exit(1);
  }
}

// Run
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
