require('dotenv').config()
const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const path = require('path')
const Dotenv = require('dotenv-webpack')

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['public'] = path.join(__dirname, 'public')
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ]

    return config
  },
  env: {
    URLPREFIX: isProd ? process.env.DOMAIN : 'http://localhost:3000',
  },
}

const config = withPlugins([[withCSS], [withLess]], nextConfig)

module.exports = config
