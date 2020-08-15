const htmlmin = require('html-minifier')
const CleanCSS = require('clean-css')
const UglifyJS = require('uglify-es')
const Image = require('@11ty/eleventy-img')
const fs = require('fs')

module.exports = function (eleventyConfig) {
    eleventyConfig.addPairedShortcode('div', async function (content, className) {
        return `<div class="${className}">${content}</div>`
    })

    eleventyConfig.addShortcode('vid', function (path, poster = '', description = '') {
        return `<figure class="video"><video src="${path}" poster="${poster}" width="960" height="540" autoplay loop muted playsinline></video><figcaption>${description}</figcaption></figure>`
    })

    eleventyConfig.addNunjucksAsyncShortcode('imgPath', async function (path) {
        const props = await optimImg(path)
        return props.url
    })

    eleventyConfig.addShortcode('img', async function (path) {
        const props = await optimImg(path)
        return `<img src="${props.url}" alt="">`
    })

    eleventyConfig.addShortcode('fig', async function (path, caption = '') {
        const props = await optimImg(path)
        return `<figure><img src="${props.url}"><figcaption>${caption}</figcaption></figure>`
    })

    async function optimImg(path, opts = {}) {
        const widths = opts?.widths || [null]
        const outputFormat = opts?.outputFormat || path.split('.').pop()
        const outputDir = 'docs/img/'
        let stats = await Image('assets/media/' + path, {
            widths: widths,
            formats: outputFormat,
            outputDir: outputDir
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
        fs.writeFile(`docs/${css}`, output, function (err) {
            if (err) {
                console.log(err)
            }
        })
        return `@import "/${css}"`
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
                collapseWhitespace: true
            })
            return minified
        }
        return content
    })

    return {
        templateFormats: ['css', 'json', 'md', 'njk', 'html', 'liquid'],

        // If your site lives in a different subdirectory, change this.
        // Leading or trailing slashes are all normalized away, so don’t worry about it.
        // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
        // This is only used for URLs (it does not affect your file structure)
        pathPrefix: '/',

        markdownTemplateEngine: 'liquid',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        passthroughFileCopy: true,
        dir: {
            input: '.',
            includes: 'data',
            data: 'data',
            output: 'docs'
        }
    }
}
