/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mejorar la detección de cambios en desarrollo
  webpack: (config, { dev }) => {
    if (dev) {
      // Configurar polling para cliente Y servidor
      config.watchOptions = {
        poll: 1000, // Verificar cambios cada segundo
        aggregateTimeout: 300, // Esperar 300ms antes de recompilar
        ignored: ['**/node_modules', '**/.git', '**/.next'],
      }
    }
    return config
  },
  // Configuración adicional para desarrollo
  reactStrictMode: true,
}

module.exports = nextConfig

