import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { getModifyVars } from './utils';
import {
  AutoImportTypes,
  regionComponents,
  RegionDevResolver,
  REGIONDEV_DIR,
} from '@regiondev/vue-components/lib/vite';

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        ...(mode === 'production' && {
          'vue-types': 'vue-types/shim',
        }),
      },
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
      sourcemap: false,
    },
    plugins: [
      Vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => {
              // return tag.startsWith('RInput') // (return true)
            },
          },
        },
      }),
      vueJsx({}),
      UnoCSS(),
      Components({
        dts: 'src/types/components.d.ts',
        types: [AutoImportTypes],
        dirs: [REGIONDEV_DIR],
        resolvers: [RegionDevResolver],
      }),
      AutoImport({
        imports: ['vue', '@vueuse/core'],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
        dts: './src/types/auto-imports.d.ts',
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            ...getModifyVars(),
          },
          javascriptEnabled: true,
        },
      },
    },
  };
};
