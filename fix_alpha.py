import glob, os
from PIL import Image

png_files = glob.glob('d:/ATC/Neeki_web/assets/img/*.png')
for png_file in png_files:
    try:
        img = Image.open(png_file)
        webp_path = os.path.splitext(png_file)[0] + '.webp'
        
        # Save keeping original mode (RGBA)
        # We need to make sure we don't accidentally convert it to RGB if it has RGBA
        # WebP supports RGBA. If it's P (palette), we might need to convert to RGBA.
        if img.mode == 'P':
            if 'transparency' in img.info:
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
                
        img.save(webp_path, 'WEBP', quality=80)
        print(f"Fixed transparency for {os.path.basename(webp_path)}")
    except Exception as e:
        print(f"Error processing {png_file}: {e}")
