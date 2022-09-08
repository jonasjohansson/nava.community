const htmlmin = require('html-minifier')
const CleanCSS = require('clean-css')
const UglifyJS = require('uglify-es')
const Image = require('@11ty/eleventy-img')
const fs = require('fs')

module.exports = function (eleventyConfig) {
	eleventyConfig.addPairedShortcode('div', async function (content, className) {
		return `<div class="${className}">${content}</div>`
	})

	eleventyConfig.addShortcode('video', function (path, poster = '', description = '') {
		return `<figure class="video"><video src="/assets/video/${path}" poster="${poster}" width="960" height="540" autoplay loop muted playsinline></video><figcaption>${description}</figcaption></figure>`
	})

	eleventyConfig.addShortcode('vimeo', function (id) {
		return `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/${id}?autoplay=0&loop=1&color=ffffff&title=0&byline=0&portrait=0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`
	})

	eleventyConfig.addShortcode('favicon', function (emoji) {
		if (emoji) {
			return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`
		} else {
			return '/favicon.png'
		}
	})
	eleventyConfig.addNunjucksAsyncShortcode('img2', async function (path) {
		const props = await optimImg(path)
		return props.url
	})

	eleventyConfig.addShortcode('img', async function (path, pathOnly = false, className) {
		const props = await optimImg(path)
		if (pathOnly) {
			return props.url
		} else {
			return `<img class="${className}" src="${props.url}" alt="">`
		}
	})

	eleventyConfig.addShortcode('fig', async function (path, caption = '') {
		const props = await optimImg(path)
		return `<figure><img src="${props.url}"><figcaption>${caption}</figcaption></figure>`
	})

	async function optimImg(path, opts = {}) {
		const widths = opts?.widths || [null]
		const outputFormat = opts?.outputFormat || path.split('.').pop()
		let stats = await Image(`./assets/img/` + path, {
			widths: widths,
			formats: outputFormat,
			urlPath: '/assets/img',
			outputDir: './docs/assets/img',
		})
		if (widths.length > 1) return stats
		else return stats[outputFormat].pop()
	}

	eleventyConfig.addFilter('wrap', function (string) {
		string = string.trim()
		string = string.replace(/^(?:(?!<figure>|<\/figure>)[\S\s])*$/gim, function (str) {
			return `<section class="text-layout">${str}</section>`
		})
		return string
	})

	// Minify CSS
	eleventyConfig.addFilter('cssmin', function (code) {
		const output = new CleanCSS({}).minify(code).styles
		const css = 'styles.css'
		fs.writeFile(`./docs/assets/${css}`, output, function (err) {
			if (err) {
				console.log(err)
			}
		})
		return `@import "/assets/${css}"`
		// return new CleanCSS({}).minify(code).styles
	})

	// Minify JS
	eleventyConfig.addFilter('jsmin', function (code) {
		let minified = UglifyJS.minify(code)
		if (minified.error) {
			console.log('UglifyJS error: ', minified.error)
			return code
		}
		return minified.code
	})

	// Minify HTML output
	eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
		if (outputPath.indexOf('.html') > -1) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			})
			return minified
		}
		return content
	})

	eleventyConfig.addPassthroughCopy('CNAME')
	eleventyConfig.addPassthroughCopy({ 'assets/fonts': 'assets/fonts' })
	eleventyConfig.addPassthroughCopy({ 'assets/video': 'assets/video' })

	eleventyConfig.setBrowserSyncConfig({
		notify: true,
	})

	eleventyConfig.addWatchTarget('./assets/css/')

	return {
		templateFormats: ['css', 'json', 'md', 'njk', 'html', 'liquid'],
		pathPrefix: '/',
		markdownTemplateEngine: 'liquid',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		passthroughFileCopy: true,
		dir: {
			input: '.',
			includes: 'data',
			data: 'data',
			output: 'docs',
		},
	}
}

