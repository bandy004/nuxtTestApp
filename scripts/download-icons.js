import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const icons = [
  'home',
  'menu',
  'chart-bubble',
  'apps',
  'chevron-right',
  'application',
  'minus'
];

const baseUrl = 'https://raw.githubusercontent.com/Templarian/MaterialDesign/master/svg/';
const iconDir = path.join(__dirname, '../public/icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

// Function to download icon
const downloadIcon = (iconName) => {
  const url = `${baseUrl}${iconName}.svg`;
  const filePath = path.join(iconDir, `${iconName}.svg`);

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.pipe(fs.createWriteStream(filePath));
      console.log(`Downloaded: ${iconName}`);
    } else {
      console.error(`Failed to download ${iconName}: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${iconName}:`, err.message);
  });
};

// Download all icons
icons.forEach(downloadIcon); 