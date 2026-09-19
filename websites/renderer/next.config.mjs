/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // De gedeelde basis is TypeScript-bron, geen gebouwd pakket.
  transpilePackages: ['@minterest/websites-shared'],
  // Klant-sites moeten indexeerbaar zijn: geen "x-powered-by", wel nette headers.
  poweredByHeader: false,
}

export default nextConfig
