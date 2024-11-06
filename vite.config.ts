import { defineConfig } from "vite";

// https://
export default defineConfig({
    // Specify any configuration you want here
    build: {
        rollupOptions:{
            input: {
                main: 'src/main.ts',
            }
        }
    }
})