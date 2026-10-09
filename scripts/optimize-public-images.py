"""Losslessly recompress website PNGs, keeping pixels and color metadata."""
from io import BytesIO
from pathlib import Path
import struct
from PIL import Image, PngImagePlugin

root = Path(__file__).resolve().parent.parent / 'public'
saved = count = 0
for file in sorted(root.rglob('*.png')):
    original = file.read_bytes()
    with Image.open(BytesIO(original)) as image:
        if getattr(image, 'n_frames', 1) > 1 or image.getexif().get(274, 1) != 1:
            continue
        color_info = PngImagePlugin.PngInfo()
        offset = 8
        while offset < len(original):
            length = struct.unpack('>I', original[offset:offset + 4])[0]
            kind = original[offset + 4:offset + 8]
            if kind in (b'gAMA', b'cHRM', b'sRGB', b'sBIT'):
                color_info.add(kind, original[offset + 8:offset + 8 + length])
            offset += length + 12
        options = {key: image.info[key] for key in ('icc_profile', 'transparency', 'dpi', 'exif') if key in image.info}
        output = BytesIO()
        image.save(output, format='PNG', optimize=True, compress_level=9, pnginfo=color_info, **options)
        compressed = output.getvalue()
        if len(compressed) >= len(original):
            continue
        with Image.open(BytesIO(compressed)) as check:
            assert image.size == check.size and image.convert('RGBA').tobytes() == check.convert('RGBA').tobytes(), file
        file.write_bytes(compressed)
        saved += len(original) - len(compressed)
        count += 1
        print(f'{file.relative_to(root)}: {len(original)} -> {len(compressed)} bytes; identical pixels')
print(f'Optimized {count} PNGs; saved {saved} bytes ({saved / 1024 / 1024:.2f} MiB).')
