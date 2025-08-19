// // import { defineConfig } from 'vite';
// // import react from '@vitejs/plugin-react';

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     proxy: {
// //       // All requests starting with /api will be sent to the backend server
// //       '/api': {
// //         target: 'http://localhost:3001',
// //         changeOrigin: true,
// //       },
// //     },
// //   },
// // });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // All requests starting with /api will be sent to the backend server
//       '/api': {
//         target: 'http://localhost:3001',
//         changeOrigin: true,
//       },
//     },
//   },
//   // Add this CSS configuration for Tailwind
//   css: {
//     postcss: {
//       plugins: [
//         require('tailwindcss'),
//         require('autoprefixer'),
//       ],
//     },
//   },
//   // Optional: Optimize build for Tailwind
//   build: {
//     cssCodeSplit: true,
//   }
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

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
})