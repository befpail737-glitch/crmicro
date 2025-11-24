const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('Starting image generation...\n');

// Function to convert SVG to PNG
async function convertSvgToPng(svgPath, outputPath, width, height) {
  try {
    await sharp(svgPath)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(outputPath);
    console.log(`✓ Created: ${path.basename(outputPath)} (${width}×${height})`);
  } catch (error) {
    console.error(`✗ Error creating ${path.basename(outputPath)}:`, error.message);
  }
}

// Function to create solid color placeholder
async function createPlaceholder(outputPath, width, height, text, bgColor = '#1a4da1') {
  try {
    // Create SVG text
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="${bgColor}"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 10}"
              fill="white" text-anchor="middle" dominant-baseline="middle">
          ${text}
        </text>
      </svg>
    `;

    const ext = path.extname(outputPath).toLowerCase();
    let sharpInstance = sharp(Buffer.from(svg)).resize(width, height);

    if (ext === '.jpg' || ext === '.jpeg') {
      await sharpInstance.jpeg({ quality: 85 }).toFile(outputPath);
    } else {
      await sharpInstance.png().toFile(outputPath);
    }

    console.log(`✓ Created placeholder: ${path.basename(outputPath)} (${width}×${height})`);
  } catch (error) {
    console.error(`✗ Error creating placeholder ${path.basename(outputPath)}:`, error.message);
  }
}

async function generateAllImages() {
  console.log('=== PHASE 1: Logo Images ===\n');

  // Logo conversions
  await convertSvgToPng(
    path.join(__dirname, 'svg', 'logo.svg'),
    path.join(imagesDir, 'logo-placeholder.png'),
    180, 40
  );

  await convertSvgToPng(
    path.join(__dirname, 'svg', 'logo.svg'),
    path.join(imagesDir, 'logo.png'),
    512, 512
  );

  // Create Open Graph logo with background
  const ogSvg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#f5f5f5"/>
      <g transform="translate(300, 250)">
        <text x="0" y="0" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="#1a4da1">LiTong</text>
        <text x="0" y="80" font-family="Arial, sans-serif" font-size="40" fill="#666">Authorized CRMICRO Distributor</text>
        <text x="0" y="140" font-family="Arial, sans-serif" font-size="30" fill="#999">专业功率半导体分销商</text>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toFile(path.join(imagesDir, 'crmicro-logo.png'));
  console.log(`✓ Created: crmicro-logo.png (1200×630)`);

  console.log('\n=== PHASE 2: Product Icons ===\n');

  // Product icons
  const icons = [
    { name: 'mosfet-icon-placeholder.png', svg: 'mosfet-icon.svg' },
    { name: 'igbt-icon-placeholder.png', svg: 'igbt-icon.svg' },
    { name: 'power-ic-icon-placeholder.png', svg: 'power-ic-icon.svg' },
    { name: 'sensor-icon-placeholder.png', svg: 'sensor-icon.svg' },
    { name: 'mcu-icon-placeholder.png', svg: 'mcu-icon.svg' },
    { name: 'si-gan-icon-placeholder.png', svg: 'si-gan-icon.svg' }
  ];

  for (const icon of icons) {
    await convertSvgToPng(
      path.join(__dirname, 'svg', icon.svg),
      path.join(imagesDir, icon.name),
      64, 64
    );
  }

  console.log('\n=== PHASE 3: News Images ===\n');

  // News images - create styled placeholders
  const newsImages = [
    { name: 'crmicro-fab-expansion.jpg', sizes: [[800, 450], [300, 200]], text: 'FAB\nExpansion', color: '#1a4da1' },
    { name: 'sic-gan-launch.jpg', sizes: [[800, 450], [300, 200]], text: 'SiC/GaN\nLaunch', color: '#2196f3' },
    { name: 'automotive-certification.jpg', sizes: [[800, 450], [300, 200]], text: 'Auto\nCertification', color: '#4caf50' },
    { name: 'efficiency-standards.jpg', sizes: [[800, 450], [300, 200]], text: 'Efficiency\nStandards', color: '#ff6b00' },
    { name: 'ev-charging-standard.jpg', sizes: [[300, 200]], text: 'EV Charging', color: '#00bcd4' },
    { name: 'wide-bandgap-market.jpg', sizes: [[300, 200]], text: 'WBG Market', color: '#9c27b0' },
    { name: 'energy-storage-policy.jpg', sizes: [[300, 200]], text: 'Energy Storage', color: '#8bc34a' },
    { name: 'tech-seminar.jpg', sizes: [[300, 200]], text: 'Tech Seminar', color: '#ff5722' },
    { name: 'global-distribution.jpg', sizes: [[300, 200]], text: 'Global Network', color: '#607d8b' }
  ];

  for (const image of newsImages) {
    for (const [width, height] of image.sizes) {
      const baseName = path.basename(image.name, path.extname(image.name));
      const ext = path.extname(image.name);
      const fileName = image.sizes.length > 1 && width === 300
        ? `${baseName}-thumb${ext}`
        : image.name;

      await createPlaceholder(
        path.join(imagesDir, fileName),
        width, height,
        image.text,
        image.color
      );
    }
  }

  console.log('\n=== PHASE 4: Team Placeholder ===\n');

  // Team placeholder with icon
  const teamSvg = `
    <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="75" r="75" fill="#e0e0e0"/>
      <circle cx="75" cy="55" r="25" fill="#9e9e9e"/>
      <ellipse cx="75" cy="115" rx="40" ry="30" fill="#9e9e9e"/>
    </svg>
  `;

  await sharp(Buffer.from(teamSvg))
    .resize(150, 150)
    .jpeg({ quality: 85 })
    .toFile(path.join(imagesDir, 'team-placeholder.jpg'));
  console.log(`✓ Created: team-placeholder.jpg (150×150)`);

  console.log('\n=== Image Generation Complete! ===\n');
  console.log(`Total images created in ${imagesDir}`);

  // List all created files
  const files = fs.readdirSync(imagesDir);
  console.log(`\nGenerated ${files.length} files:`);
  files.sort().forEach(file => console.log(`  - ${file}`));
}

generateAllImages().catch(console.error);
