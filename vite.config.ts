import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://
export default defineConfig({
    // Specify any configuration you want here
    build: {
        // rollupOptions:{
        //     input: {
        //         main: 'src/main.ts',
        //         router: 'src/router.ts',
        //         index: 'index.html',
        //     },
        //     output: {
        //         dir: 'dist',
        //     }
        // },
        // Ensure assets are included in the build.
        // This is the limit for inlining assets in the HTML - to prevent the HTML from being too large.
        // assetsInlineLimit: 4096,
    },
    base: '/',
    plugins: [
        tsconfigPaths(),
        checker({ typescript: true })
    ],
})