import { mkdir, readdir, rm, stat, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const requiredFiles = ['index.html', 'styles.css', 'script.js'];

async function copyRecursive(source, target) {
  const sourceStat = await stat(source);
  if (sourceStat.isDirectory()) {
    await mkdir(target, { recursive: true });
    const entries = await readdir(source);
    await Promise.all(entries.map((entry) => copyRecursive(join(source, entry), join(target, entry))));
    return;
  }
  await copyFile(source, target);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of requiredFiles) {
  await copyFile(join(root, file), join(dist, file));
}

try {
  await copyRecursive(join(root, 'assets'), join(dist, 'assets'));
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}

console.log(`Built ${requiredFiles.length} core files into dist/`);
