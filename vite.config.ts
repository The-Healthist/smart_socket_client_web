import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import mockDevServerPlugin from "vite-plugin-mock-dev-server";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import viteCompression from "vite-plugin-compression";

import basicSsl from "@vitejs/plugin-basic-ssl";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { plugin } from "postcss";

// 当前工作目录路径
const root: string = process.cwd();

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]"
      }
    }
  },
  base: "/client/",
  plugins: [
    vue(),
    vueJsx(),
    mockDevServerPlugin(),
    // vant 组件自动按需引入
    Components({
      dts: "src/typings/components.d.ts",
      resolvers: [VantResolver()]
    }),
    // svg icon
    createSvgIconsPlugin({
      // 指定图标文件夹
      iconDirs: [path.resolve(root, "src/icons/svg")],
      // 指定 symbolId 格式
      symbolId: "icon-[dir]-[name]"
    }),
    // 允许 setup 语法糖上添加组件名属性
    vueSetupExtend(),
    // 生产环境 gzip 压缩资源
    viteCompression(),
    basicSsl()
    // 生产环境默认不启用 CDN 加速
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    host: true,
    // 仅在 proxy 中配置的代理前缀， mock-dev-server 才会拦截并 mock
    // doc: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
    proxy: {
      "/api": {
        target: "https://sockettest.skylinedances.com/api",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    },
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173
    }
  }
});
