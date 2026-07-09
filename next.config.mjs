import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this folder. Without this, Next.js can pick the
  // wrong root when an unrelated package-lock.json exists higher up the disk.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
