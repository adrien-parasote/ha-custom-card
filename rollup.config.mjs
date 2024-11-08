import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';


export default {
	input: 'dist/dashboard-card.js',
	output: {
		file: 'dashboard-card.min.js',
		name: 'version',
		format: 'iife'
	},
	onwarn(warning) {
		if (warning.code !== 'THIS_IS_UNDEFINED') {
			console.error(`(!) ${warning.message}`);
		}
	},
	plugins: [
		replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
		resolve(),
		terser({
			ecma: 2021,
			module: true,
			warnings: true,
			mangle: {
				properties: {
				regex: /^__/,
				},
			},
		}),
		json()]
};