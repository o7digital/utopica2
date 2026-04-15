const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const teamImagesDir = path.join(__dirname, '../public/images/team');
  const optimizedDir = path.join(__dirname, '../public/images/team/optimized');

  // Create optimized directory if it doesn't exist
  try {
    await fs.mkdir(optimizedDir, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
  }

  const files = await fs.readdir(teamImagesDir);
  const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'));

  console.log(`Found ${imageFiles.length} images to optimize`);

  for (const file of imageFiles) {
    const inputPath = path.join(teamImagesDir, file);
    const outputPath = path.join(optimizedDir, file.replace('.jpg', '.webp').replace('.jpeg', '.webp'));
    
    try {
      // Get original file stats
      const stats = await fs.stat(inputPath);
      const originalSize = stats.size;

      // Optimize and convert to WebP
      await sharp(inputPath)
        .resize(800, 800, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ 
          quality: 85,
          effort: 6 
        })
        .toFile(outputPath);

      // Get optimized file stats
      const optimizedStats = await fs.stat(outputPath);
      const optimizedSize = optimizedStats.size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

      console.log(`✓ ${file}: ${(originalSize/1024).toFixed(1)}KB → ${(optimizedSize/1024).toFixed(1)}KB (${savings}% reduction)`);

      // Also create a fallback JPEG version
      const jpegPath = path.join(optimizedDir, file);
      await sharp(inputPath)
        .resize(800, 800, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: 90,
          progressive: true 
        })
        .toFile(jpegPath);

    } catch (error) {
      console.error(`Error optimizing ${file}:`, error);
    }
  }

  console.log('\nOptimization complete! Remember to:');
  console.log('1. Update image imports to use WebP with JPEG fallback');
  console.log('2. Use the OptimizedImage component for proper loading');
}

optimizeImages().catch(console.error);