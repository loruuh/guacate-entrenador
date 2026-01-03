# git-push.ps1
$message = Read-Host -Prompt "Was hast du geändert? (Commit-Nachricht)"
if (-not $message) { $message = "Automatisches Update $(Get-Date -Format 'dd.MM.yyyy HH:mm')" }

git add .
git commit -m "$message"
git push

Write-Host "✅ Projekt erfolgreich zu Git gepusht!" -ForegroundColor Green
Pause