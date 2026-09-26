param([switch]$CheckOnly)
$ErrorActionPreference = 'Stop'
$capNode = Get-Command node -ErrorAction SilentlyContinue
if ($capNode) { $capNodePath = $capNode.Source } else {
  $capNodePath = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
}
if (!(Test-Path -LiteralPath $capNodePath)) { throw 'Node.js nao encontrado. Instale Node.js 22 ou superior e tente novamente.' }
$capVersion = & $capNodePath --version
if ($LASTEXITCODE -ne 0) { throw 'Nao foi possivel verificar a versao do Node.js.' }
$capVersionText = ($capVersion | Select-Object -Last 1).Trim()
if ($capVersionText -notmatch '^v(\d+)\.\d+\.\d+') { throw 'Versao do Node.js nao reconhecida.' }
$capMajor = [int]$Matches[1]
if ($capMajor -lt 22) { throw 'Use Node.js 22 ou superior.' }
if ($CheckOnly) { Write-Host "Verificacao concluida: Node.js $capVersionText compativel. Nenhuma chave solicitada."; return }
Write-Host 'CAP AI - laboratorio local. Use somente conversas ficticias.'
Write-Host 'A chave nao sera salva em arquivo. Cole abaixo e pressione Enter.'
$capSecure = Read-Host 'Chave da Anthropic (entrada oculta)' -AsSecureString
$capPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($capSecure)
$capPreviousKey = $env:ANTHROPIC_API_KEY
try {
  $env:ANTHROPIC_API_KEY = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($capPointer).Trim()
  if ([string]::IsNullOrWhiteSpace($env:ANTHROPIC_API_KEY)) { throw 'Chave vazia. Inicie novamente.' }
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($capPointer)
  $capPointer = [IntPtr]::Zero
  Write-Host 'Quando aparecer CAP AI: http://127.0.0.1:8765, abra esse endereco no Edge.'
  & $capNodePath (Join-Path $PSScriptRoot 'server.mjs')
} finally {
  $env:ANTHROPIC_API_KEY = $capPreviousKey
  $capPreviousKey = $null
  if ($capPointer -ne [IntPtr]::Zero) { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($capPointer) }
  $capSecure.Dispose()
}
