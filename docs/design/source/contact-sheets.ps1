$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$designRoot = Join-Path (Get-Location).Path 'docs\design'
$labelFont = [System.Drawing.Font]::new('Arial', 12)
$titleFont = [System.Drawing.Font]::new('Arial', 26, [System.Drawing.FontStyle]::Bold)
$ink = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#232520'))
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
try {
    foreach ($group in @('desktop','mobile','boards')) {
        $folder = if ($group -eq 'boards') { 'boards' } else { 'screens' }
        $files = Get-ChildItem -LiteralPath (Join-Path $designRoot $folder) -Filter '*.jpg' | Where-Object { $group -eq 'boards' -or $_.Name.Contains($group) } | Sort-Object Name
        $columns = if ($group -eq 'boards') { 2 } elseif ($group -eq 'mobile') { 4 } else { 3 }
        $cellWidth = [int](1400 / $columns)
        $cellHeight = if ($group -eq 'boards') { 700 } else { 850 }
        $rows = [int][math]::Ceiling($files.Count / $columns)
        $bitmap = [System.Drawing.Bitmap]::new(1440, 130 + $rows * $cellHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        try {
            $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#d9d9d0'))
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.DrawString("Portfolio design / $group", $titleFont, $ink, 25, 22)
            $graphics.DrawString("$($files.Count) complete saved images / 13 November 2026", $labelFont, $ink, 27, 76)
            for ($i=0; $i -lt $files.Count; $i++) {
                $x = 20 + ($i % $columns) * $cellWidth
                $y = 120 + [int][math]::Floor($i / $columns) * $cellHeight
                $image = [System.Drawing.Image]::FromFile($files[$i].FullName)
                try {
                    $scale = [math]::Min(($cellWidth - 24) / $image.Width, ($cellHeight - 55) / $image.Height)
                    $width = [int][math]::Round($image.Width * $scale)
                    $height = [int][math]::Round($image.Height * $scale)
                    $graphics.DrawImage($image, [int]($x+($cellWidth-24-$width)/2), $y, $width, $height)
                    $graphics.DrawString($files[$i].BaseName, $labelFont, $ink, $x, $y+$cellHeight-42)
                } finally { $image.Dispose() }
            }
            $options = [System.Drawing.Imaging.EncoderParameters]::new(1)
            $options.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]93)
            try { $bitmap.Save((Join-Path $designRoot "review-$group.jpg"), $jpegCodec, $options) } finally { $options.Dispose() }
        } finally { $graphics.Dispose(); $bitmap.Dispose() }
    }
} finally { $labelFont.Dispose(); $titleFont.Dispose(); $ink.Dispose() }
Write-Output 'Saved three complete contact sheets from the exported image files.'
