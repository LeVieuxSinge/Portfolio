$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$designRoot = Join-Path (Get-Location).Path 'docs\design_v3'
$font = [System.Drawing.Font]::new('Arial', 11)
$titleFont = [System.Drawing.Font]::new('Arial', 24, [System.Drawing.FontStyle]::Bold)
$ink = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#232520'))
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
try {
 foreach ($group in @('home','menu','work','about','archive','project','loading','boards','references')) {
  $folder = if ($group -in @('boards','references')) { $group } else { 'screens' }
  $files = Get-ChildItem -LiteralPath (Join-Path $designRoot $folder) -Filter '*.jpg' | Where-Object { $folder -ne 'screens' -or $_.Name.StartsWith("$group-") } | Sort-Object Name
  $columns = if ($group -eq 'home') { 4 } else { 3 }
  $cellWidth = [int](1400 / $columns)
  $cellHeight = if ($group -in @('home','menu','loading','references','boards')) { 650 } else { 1050 }
  $bitmap = [System.Drawing.Bitmap]::new(1440, 110 + [int][math]::Ceiling($files.Count / $columns) * $cellHeight)
  $g = [System.Drawing.Graphics]::FromImage($bitmap)
  try {
   $g.Clear([System.Drawing.ColorTranslator]::FromHtml('#d9d9d0'))
   $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
   $g.DrawString("Design V3 / $group", $titleFont, $ink, 25, 25)
   for ($i=0;$i -lt $files.Count;$i++) {
    $x=20+($i%$columns)*$cellWidth; $y=100+[int][math]::Floor($i/$columns)*$cellHeight
    $im=[System.Drawing.Image]::FromFile($files[$i].FullName)
    try {
     $scale=[math]::Min(($cellWidth-24)/$im.Width,($cellHeight-55)/$im.Height)
     $w=[int]($im.Width*$scale);$h=[int]($im.Height*$scale)
     $g.DrawImage($im,[int]($x+($cellWidth-24-$w)/2),$y,$w,$h)
     $g.DrawString($files[$i].BaseName,$font,$ink,$x,$y+$cellHeight-40)
    } finally {$im.Dispose()}
   }
   $options=[System.Drawing.Imaging.EncoderParameters]::new(1)
   $options.Param[0]=[System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality,[long]92)
   try {$bitmap.Save((Join-Path $designRoot "review-$group.jpg"),$codec,$options)}finally{$options.Dispose()}
  }finally{$g.Dispose();$bitmap.Dispose()}
 }
}finally{$font.Dispose();$titleFont.Dispose();$ink.Dispose()}
Write-Output 'Saved grouped V3 review sheets.'

