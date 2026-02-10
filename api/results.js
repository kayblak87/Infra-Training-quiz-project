// api/results.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const filePath = path.join(process.cwd(), 'data', 'results.json');

  if (!fs.existsSync(filePath)) {
    return res.status(200).json([]); // Return empty array if no data yet
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);

  res.status(200).json(data);
}