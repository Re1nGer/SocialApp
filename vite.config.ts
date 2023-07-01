import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
  manifest: {
    name: "Social Media App",
    short_name: "Social App",
    description: "A social media app that can be used to create posts and share with friends.",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        size: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        size: "512x512",
        type: "image/png"
      },
      {
        src: "/apple-touch-icon.png",
        size: "180x180",
        type: "image/png",
        purpose: "apple touch icon"
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },

}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
