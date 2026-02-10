// api/submit.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;
  
  // Path to your storage file (created automatically if it doesn't exist)
  const filePath = path.join(process.cwd(), 'data', 'results.json');
  const dirPath = path.join(process.cwd(), 'data');

  // Ensure directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  // Read existing data
  let existingData = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    existingData = JSON.parse(fileContent);
  }

  // Add new result
  existingData.push(data);

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

  res.status(200).json({ message: 'Result saved successfully' });
}