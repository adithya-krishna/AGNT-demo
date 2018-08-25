/**
 *	Postcss Config
 *	-	Most of these plugins are used by react toolbox.
 *	-	since we use certain components only, we only compile relevant css from the package.
 *	-	As seen below, postcss will handle browser support.
		the browserlist given below will help in auto prefixes and polyfills
 */
var postcssImport = require('postcss-import');
var postcssPresetEnv = require('postcss-preset-env');
var postcssMixins = require('postcss-mixins');
var postcssEach = require('postcss-each');
var postcssApply = require('postcss-apply');
var postcssNesting = require('postcss-nesting');
var postcssReporter = require('postcss-reporter');
var postcssLost = require('lost');
var path = require('path');
const reactToolboxVariables = require('./css-overrides');

module.exports = ctx => ({
	sourceMap: true,
	plugins: [
		postcssImport({
			addModulesDirectories: [
				path.join(__dirname, 'node_modules/react-toolbox'),
				'app'
			]
		}),
		postcssMixins(),
		postcssEach(),
		postcssApply(),
		postcssNesting(),
		postcssLost(),
		postcssPresetEnv({
			stage: 0,
			browserslist: ['last 2 versions', 'ios >= 8'],
			features: {
				'custom-properties': {
					preserve: false,
					variables: reactToolboxVariables
				}
			},
			autoprefixer: {
				grid: true
			}
		}),
		postcssReporter({
			clearMessages: true
		})
	]
});
