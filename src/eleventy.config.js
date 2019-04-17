// const CleanCSS = require('clean-css');
// const UglifyJS = require('uglify-es');
const htmlmin = require('html-minifier');

module.exports = eleventyConfig => {
	// Minify CSS
	// eleventyConfig.addFilter('cssmin', function(code) {
	// 	return new CleanCSS({}).minify(code).styles;
	// });

	// // Minify JS
	// eleventyConfig.addFilter('jsmin', function(code) {
	// 	let minified = UglifyJS.minify(code);
	// 	if (minified.error) {
	// 		console.log('UglifyJS error: ', minified.error);
	// 		return code;
	// 	}
	// 	return minified.code;
	// });

	// // Minify HTML output
	// eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
	// 	if (outputPath.indexOf('.html') > -1) {
	// 		let minified = htmlmin.minify(content, {
	// 			useShortDoctype: true,
	// 			removeComments: true,
	// 			collapseWhitespace: true
	// 		});
	// 		return minified;
	// 	}
	// 	return content;
	// });

	eleventyConfig.addFilter('path', outputPath => {
		var count = outputPath.split('/').length - 1;

		if (count == 2) {
			return '../';
		} else {
			return '';
		}
	});

	eleventyConfig.addPassthroughCopy('assets');
	return {
		templateFormats: ['njk', 'md', 'html'],
		dir: {
			input: '.',
			includes: 'includes',
			data: 'data',
			output: '../'
		},
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		passthroughFileCopy: true
	};
};
