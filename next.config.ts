import { NextConfig } from 'next'

const config: NextConfig = {
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },

  images: { remotePatterns: [{ hostname: '*' }], unoptimized: true },
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@a/ui'],
  typescript: { ignoreBuildErrors: true }
}

export default config
