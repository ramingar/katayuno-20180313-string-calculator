import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
    entry: 'public/assets/src/js/init.js', // Entry file,
    format: 'es',
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        resolve(),
        commonjs(),
        babel(babelrc({addModuleOptions: false}))
    ],
    dest: 'public/assets/build/js/index.js'
};