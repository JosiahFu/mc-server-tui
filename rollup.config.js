import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

/** @type {import('rollup').RollupOptions[]} */
const config = [
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist',
            format: 'es',
            sourcemap: true,
        },
        plugins: [typescript(), nodeResolve()],
    },
];

export default config;
