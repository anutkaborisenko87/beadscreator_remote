import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        tailwindcss(),
        react(),
        ViteImageOptimizer({
            svg: {
                multipass: true,
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                cleanupNumericValues: false,
                                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                            },
                            cleanupIDs: {
                                minify: false,
                                remove: false,
                            },
                            convertPathData: false,
                        },
                    },
                    'sortAttrs',
                    {
                        name: 'addAttributesToSVGElement',
                        params: {
                            attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                        },
                    },
                ],
            },
            png: {
                quality: 70,
            },
            jpeg: {
                quality: 70,
            },
            jpg: {
                quality: 70,
            },
            tiff: {
                quality: 70,
            },
            webp: {
                // https://sharp.pixelplumbing.com/api-output#webp
                lossless: true,
            },
        }),
    ],
    resolve: {
        alias: {
            "@":  path.resolve(__dirname, "resources/js")
        },
        extensions: [".js", ".jsx"]
    }
});
