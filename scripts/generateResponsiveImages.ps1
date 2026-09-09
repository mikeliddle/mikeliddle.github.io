param(
    [Parameter(Mandatory = $true, ValueFromRemainingArguments = $true)]
    [string[]] $Paths
)

$ErrorActionPreference = "Stop"
$widths = 640, 1200, 1800

foreach ($path in $Paths) {
    $source = Resolve-Path $path
    $directory = Split-Path $source
    $stem = [System.IO.Path]::GetFileNameWithoutExtension($source)

    foreach ($width in $widths) {
        $scale = "scale=$width`:-2:flags=lanczos"
        $webp = Join-Path $directory "$stem-$width.webp"
        $avif = Join-Path $directory "$stem-$width.avif"

        & ffmpeg -hide_banner -loglevel error -y -i $source -vf $scale `
            -c:v libwebp -quality 82 -compression_level 6 $webp
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to generate $webp"
        }

        & ffmpeg -hide_banner -loglevel error -y -i $source -vf $scale `
            -c:v libaom-av1 -crf 30 -b:v 0 -cpu-used 8 -still-picture 1 -pix_fmt yuv420p $avif
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to generate $avif"
        }
    }

    $jpeg = Join-Path $directory "$stem-1800.jpg"
    & ffmpeg -hide_banner -loglevel error -y -i $source -vf "scale=1800:-2:flags=lanczos" `
        -map_metadata -1 -q:v 3 $jpeg
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to generate $jpeg"
    }
}
