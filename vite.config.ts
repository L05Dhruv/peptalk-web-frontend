import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://
export default defineConfig({
    // Specify any configuration you want here
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: 'index.html',
                // Add other entry points if needed
            }
        }
    },
    base: '/',
    plugins: [
        tsconfigPaths(),
        checker({ typescript: true })
    ],
})