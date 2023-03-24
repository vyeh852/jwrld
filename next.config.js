/** @type {import('next').NextConfig} */
const withLinaria = require("next-linaria");
module.exports = withLinaria({
  webpack(config) {
    return config;
  },
  reactStrictMode: true,
});
