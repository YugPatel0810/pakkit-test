import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const form = new IncomingForm({
      uploadDir: uploadsDir,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error processing file upload' });
      }

      const file = files.file[0];
      const newPath = path.join(uploadsDir, file.originalFilename);
      
      // Rename the file to its original name
      fs.renameSync(file.filepath, newPath);

      return res.status(200).json({ 
        message: 'File uploaded successfully',
        filePath: newPath 
      });
    });
  } catch (error) {
    console.error('Error saving file:', error);
    return res.status(500).json({ error: 'Error saving file' });
  }
}