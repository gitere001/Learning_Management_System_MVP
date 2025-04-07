import fs from 'fs/promises';
import path from 'path';

export const moveFile = async (tempPath, targetDir, filename) => {
  const targetPath = path.join(process.cwd(), targetDir);

  await fs.mkdir(targetPath, { recursive: true }); // Create dir if missing
  await fs.rename(tempPath, path.join(targetPath, filename));

  return path.join(targetDir, filename); // Return relative path
};

export const deleteFile = async (filePath) => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    await fs.unlink(fullPath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};