/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export (deployed to GitHub Pages) -> ./out
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
