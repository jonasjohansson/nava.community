module.exports = eleventyConfig => {
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
