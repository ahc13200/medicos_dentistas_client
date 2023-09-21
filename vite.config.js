var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { loadEnv } from 'vite';
import { getModifyVars } from './utils';
import { AutoImportTypes, RegionDevResolver, REGIONDEV_DIR, } from '@regiondev/vue-components/lib/vite';
export default (function (_a) {
    var command = _a.command, mode = _a.mode;
    var env = loadEnv(mode, process.cwd());
    return {
        resolve: {
            alias: __assign({}, (mode === 'production' && {
                'vue-types': 'vue-types/shim'
            }))
        },
        build: {
            target: 'esnext',
            cssCodeSplit: true,
            minify: 'esbuild',
            outDir: './dist',
            //   polyfillDynamicImport: VITE_LEGACY,
            //   terserOptions: {
            //     compress: {
            //       keep_infinity: true,
            //       // Used to delete console in production environment
            //       drop_console: VITE_DROP_CONSOLE,
            //     },
            //   },
            // Turning off brotliSize display can slightly reduce packaging time
            //   brotliSize: false,
            chunkSizeWarningLimit: 500,
            sourcemap: false
        },
        plugins: [
            Vue({
                template: {
                    compilerOptions: {
                        isCustomElement: function (tag) {
                            // return tag.startsWith('RInput') // (return true)
                        }
                    }
                }
            }),
            vueJsx({}),
            UnoCSS(),
            Components({
                dts: 'src/types/components.d.ts',
                types: [AutoImportTypes],
                dirs: [REGIONDEV_DIR],
                resolvers: [RegionDevResolver]
            }),
            AutoImport({
                imports: ['vue', '@vueuse/core'],
                eslintrc: {
                    enabled: true,
                    filepath: './.eslintrc-auto-import.json',
                    globalsPropValue: true
                },
                dts: './src/types/auto-imports.d.ts'
            }),
        ],
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: __assign({}, getModifyVars()),
                    javascriptEnabled: true
                }
            }
        }
    };
});
