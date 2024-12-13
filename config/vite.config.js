import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import visualizer from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import VueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from 'vite-plugin-pwa'

const postCssScss = require("postcss-scss");
const postcssRTLCSS = require("postcss-rtlcss");

const viteCompressionFilter = /\.(js|mjs|json|css|html|svg)$/i;

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },
    define: {
        "FRONTEND_VERSION": JSON.stringify(process.env.npm_package_version),
        "process.env": {},
    },
    plugins: [
        vue(),
        visualizer({
            filename: "tmp/dist-stats.html"
        }),
        viteCompression({
            algorithm: "gzip",
            filter: viteCompressionFilter,
        }),
        viteCompression({
            algorithm: "brotliCompress",
            filter: viteCompressionFilter,
        }),
        VueDevTools(),
        VitePWA({
            registerType: null,
            // outDir: path.resolve(__dirname, 'public'),
            // manifest: manifest,
            // manifestFilename: 'manifest.json', // Change name for app manifest
            // injectRegister: false, // I register SW in app.ts, disable auto registration
            
            // // HERE! For custom service worker
            srcDir: 'src',
            filename: 'serviceWorker.ts',
            strategies: 'injectManifest',
            // injectRegister: false,

        
            // workbox: {
            //     globDirectory: path.resolve(__dirname, 'public'),
            //     globPatterns: [
            //     '{build,images,sounds,icons}/**/*.{js,css,html,ico,png,jpg,mp4,svg}'
            //     ],
            // },
            devOptions: {
                enabled: true,
                type: 'module'
            },
        }),
    ],
    css: {
        postcss: {
            "parser": postCssScss,
            "map": false,
            "plugins": [ postcssRTLCSS ]
        }
    },
    build: {
        commonjsOptions: {
            include: [ /.js$/ ],
        },
        rollupOptions: {
            output: {
                manualChunks(id, { getModuleInfo, getModuleIds }) {

                }
            }
        },
    }
});
