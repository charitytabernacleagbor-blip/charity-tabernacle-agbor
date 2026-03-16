import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).json({message: "Method Not Allowed"});

  // Simple password check (same as admin)
  const { password, data } = req.body;
  if(password !== "CharityAdmin2026") {
    return res.status(401).json({message: "Unauthorized"});
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'churchData.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return res.status(200).json({message: "Data updated successfully"});
  } catch(err) {
    console.error(err);
    return res.status(500).json({message: "Server error"});
  }
}
