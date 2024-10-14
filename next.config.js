/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md'], // Add 'md' if you still want to support Markdown files
  // Add any other Next.js configuration options you need
};

module.exports = nextConfig;
