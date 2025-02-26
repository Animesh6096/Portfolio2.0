import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateIcons() {
  const inputFile = join(__dirname, '../public/icons/logo192.jpg');
  const outputDir = join(__dirname, '../public/icons');

  try {
    // Ensure output directory exists
    await mkdir(outputDir, { recursive: true });

    // Generate favicon.ico (16x16)
    await sharp(inputFile)
      .resize(16, 16)
      .toFormat('png')
      .toFile(join(outputDir, 'favicon.ico'));

    // Generate icon-16x16.png
    await sharp(inputFile)
      .resize(16, 16)
      .toFormat('png')
      .toFile(join(outputDir, 'icon-16x16.png'));

    // Generate icon-32x32.png
    await sharp(inputFile)
      .resize(32, 32)
      .toFormat('png')
      .toFile(join(outputDir, 'icon-32x32.png'));

    // Generate logo512.jpg if it doesn't exist
    await sharp(inputFile)
      .resize(512, 512)
      .toFormat('jpeg')
      .toFile(join(outputDir, 'logo512.jpg'));

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();