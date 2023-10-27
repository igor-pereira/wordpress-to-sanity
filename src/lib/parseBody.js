const {JSDOM} = require('jsdom')
const blockTools = require('@sanity/block-tools').default
const sanitizeHTML = require('./sanitizeHTML')
const defaultSchema = require('../../schema/lhrSchema')
const { default: randomKey } = require('@sanity/block-tools/lib/util/randomKey')

const blockContentType = defaultSchema
  .get('post')
  .fields.find((field) => field.name === 'content').type

function htmlToBlocks(html, options) {
  if (!html) {
    return []
  }

  const blocks = blockTools.htmlToBlocks(sanitizeHTML(html), blockContentType, {
    parseHtml: (htmlContent) => new JSDOM(htmlContent).window.document,
    rules: [
      {
        deserialize(el, next, block) {
          // Special case for code blocks (wrapped in pre and code tag)
          if (el.tagName.toLowerCase() !== 'pre') {
            return undefined
          }
          const code = el.children[0]
          let text = ''
          if (code) {
            const childNodes =
              code && code.tagName.toLowerCase() === 'code' ? code.childNodes : el.childNodes
            childNodes.forEach((node) => {
              text += node.textContent
            })
          } else {
            text = el.textContent
          }
          if (!text) {
            return undefined
          }
          return block({
            children: [],
            _type: 'code',
            text: text,
          })
        },
      },
      {
        deserialize(el, next, block) {
          if (el.tagName === 'IMG') {
            return block({
              // children: [],
              _type: 'image',
              _sanityAsset: `image@${el.getAttribute('src').replace(/^\/\//, 'https://')}`,
            })
          }

          if (
            el.tagName.toLowerCase() === 'p' &&
            el.childNodes.length === 1 &&
            el.childNodes.tagName &&
            el.childNodes[0].tagName.toLowerCase() === 'img'
          ) {
            return block({
              _sanityAsset: `image@${el.childNodes[0]
                .getAttribute('src')
                .replace(/^\/\//, 'https://')}`,
            })
          }
          // Only convert block-level images, for now
          return undefined
        },
      },
      {
        deserialize(el, next, block) {
          if (el.tagName.toLowerCase()  != 'a') {
            return undefined
          }
          //const linkEnabled = options.enabledBlockAnnotations.includes('link')
          const linkEnabled = true
          const href = el.getAttribute('href')
          if (!href) {
            return next(el.childNodes)
          }
          let markDef
          if (linkEnabled) {
            markDef = {
              _key: randomKey(12),
              _type: 'externalLink',
              href: href,
              blank:true,
            }
            return {
              _type: '__annotation',
              markDef: markDef,
              children: next(el.childNodes),
            }
          }
          return el.appendChild(el.ownerDocument.createTextNode(` (${href})`)) && next(el.childNodes)
        },
      },
    ],
  })
  return blocks
}

module.exports = (bodyHTML) => htmlToBlocks(bodyHTML)
