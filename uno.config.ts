import {safelist, unocssShorcuts, colorPaletteVar} from '@regiondev/vue-components/lib/vite';
import transformerDirectives from '@unocss/transformer-directives';
import {defineConfig} from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import colors from 'tailwindcss/colors';
import {aguaColors} from './unocss/theme/aguaColors';

const aguaMarzo = aguaColors();
export default defineConfig({
    transformers: [transformerDirectives()],
    theme: {
        breakpoints: {
            xs: '240px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        colors: {
            secondary: aguaMarzo.agua,
            //primary: asitColors.asisturBlue,
            //secondary: asitColors.asisturBlue,
            //third: asitColors.asisturGray,
            //cuarto: asitColors.asisturRed,
        },
    },
    include: [
        'src/**/*',
        /\.js$/,
        /vue-components\/*.js$/,
        // 'node_modules/**/*.js',
        // /\.js$/, /\.vue\?vue/
        // /rd\.js$/,
        // /\index.rd.js$/,
    ],
    safelist: [...safelist, 'p-2', 'h-9', 'py-1.5'],
    shortcuts: {
        ...unocssShorcuts,
        press: 'active:scale-95 hover:cursor-pointer transform motion-reduce:transform-none',
        'text-muted': 'text-slate-500 dark:text-slate-400',
        'text-theme': 'text-black dark:text-white',
        flexR: 'flex flex-row',
        flexC: 'flex flex-col',
        card: 'relative overflow-hidden border border-0.1px border-transparent shadow p-4 transition-opacity transition-shadow transition-transform duration-200 dark:border-cool-gray-700 dark:border-opacity-60 bg-slate-50 dark:bg-slate-800 rounded-xl',
        round: 'rounded-lg',
        'round-big': 'rounded-xl',
        'flex-center': 'flex justify-center items-center',
        'absolute-center': 'absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'bg-surface': 'bg-slate-50 dark:bg-slate-800',
    },
    presets: [
        presetUno({}),
        presetAttributify(),
        presetIcons({
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle',
            },
        }),
    ],
});
