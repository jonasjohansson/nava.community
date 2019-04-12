module.exports = eleventyConfig => {
  eleventyConfig.addPassthroughCopy('src/assets');
  return {
    templateFormats: ['njk', 'md', 'html'],
    dir: {
      input: 'src',
      includes: 'includes',
      data: 'data',
      output: 'public'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
