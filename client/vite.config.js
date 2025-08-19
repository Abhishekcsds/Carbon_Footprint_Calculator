
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from 'tailwindcss'
// import autoprefixer from 'autoprefixer'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3001',
//         changeOrigin: true,
//       },
//     },
//   },
//   css: {
//     postcss: {
//       plugins: [
//         tailwindcss(),
//         autoprefixer(),
//       ],
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  optimizeDeps: {
    include: ['@canvasjs/react-charts'], // 👈 Force Vite to pre-bundle this CJS lib
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // 👈 Allow CJS + ESM in same package
    },
    cssCodeSplit: true, // keep your Tailwind optimization
  },
})
