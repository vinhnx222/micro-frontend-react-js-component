import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import relay from "vite-plugin-relay";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// import { CommonConfig } from "./vite.config";

export default defineConfig({
    // ...CommonConfig,
    plugins: [
        relay,
        svgr(),
        react(),
        cssInjectedByJsPlugin({
            jsAssetsFilterFunction: function customJsAssetsfilterFunction(
                outputChunk,
            ) {
                const regex = /^.*-entry\.js$/;
                return regex.test(outputChunk.fileName);
            },
        }),
    ],
    build: {
        cssCodeSplit: true,
        lib: {
            formats: ["es"],
            entry: {
                "messages-full": resolve(
                    // eslint-disable-next-line no-undef
                    __dirname,
                    "src/main.jsx",
                ),
            },
            fileName: "[name]-entry",
        },
        outDir: "dist/mfe",
    },
    define: { "process.env.NODE_ENV": '"development"' },
});
