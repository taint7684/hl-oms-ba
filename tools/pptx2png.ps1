# Xuất từng slide của một file .pptx ra PNG bằng PowerPoint (để soát bố cục).
param([string]$Pptx, [string]$OutDir)
$pp = New-Object -ComObject PowerPoint.Application
$p = $pp.Presentations.Open((Resolve-Path $Pptx).Path, $true, $false, $false)
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
$i = 1
foreach ($s in $p.Slides) { $s.Export((Join-Path (Resolve-Path $OutDir).Path ("s{0:d2}.png" -f $i)), "PNG", 1600, 900); $i++ }
$p.Close(); $pp.Quit()
