module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy('admin');
  eleventyConfig.addPassthroughCopy('assets');
  return {
    templateFormats: ['njk', 'md', 'html'],
    dir: {
      input: '.',
      includes: 'includes',
      data: 'data',
      output: 'docs'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
