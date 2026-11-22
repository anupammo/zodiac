/** @type {import('next').NextConfig} */
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: {
    document: '/offline',
  },
})
const withNextIntl = require('next-intl/plugin')('./i18n/request.js')

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Apps installed before per-language manifests still check /manifest.json for updates.
  async rewrites() {
    return [{ source: '/manifest.json', destination: '/manifests/en.webmanifest' }]
  },
}

module.exports = withPWA(withNextIntl(nextConfig))
