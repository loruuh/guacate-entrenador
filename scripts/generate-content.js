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
        audioEncoding: 'MP3'
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
  console.log('🚀 Starting content generation for 1000 vocabulary items\n');
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
  console.log(`✓ Loaded ${vocabData.length} vocabulary items\n`);
  console.log('─'.repeat(60));

  const failed = [];
  const startTime = Date.now();

  // Process each vocabulary item
  for (let i = 0; i < vocabData.length; i++) {
    const result = await processVocabulary(vocabData[i], i, vocabData.length);

    if (!result.success) {
      failed.push({ id: result.id, error: result.error });
    }

    // Rate limiting
    if (i < vocabData.length - 1) {
      await sleep(RATE_LIMIT_DELAY);
    }
  }

  // Save updated vocabulary
  console.log('\n' + '─'.repeat(60));
  console.log('\n💾 Saving updated vocabulary file...');
  await fs.writeFile(VOCAB_FILE, JSON.stringify(vocabData, null, 2), 'utf-8');
  console.log('✓ Saved!\n');

  // Summary
  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
  const successCount = vocabData.length - failed.length;

  console.log('═'.repeat(60));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(60));
  console.log(`✅ Successful: ${successCount}/${vocabData.length}`);
  console.log(`❌ Failed: ${failed.length}/${vocabData.length}`);
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
