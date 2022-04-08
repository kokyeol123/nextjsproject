/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 외부 도메인 설정
    domains: ["via.placeholder.com"]
  }
}

module.exports = nextConfig
