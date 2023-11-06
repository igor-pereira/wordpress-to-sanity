const fs = require('fs')
const readline = require('readline')
const parseBody = require('./lib/parseBody')
const convertToISO8601 = require('./lib/convertDate')

const outputFilePath = 'produtos_output.ndjson'

const writeStream = fs.createWriteStream(outputFilePath)
let i = 0

const createdCategories = []
const createdAuthor = []

const rawData = fs.readFileSync('blog_post_input.json')
const blogPosts = JSON.parse(rawData)

blogPosts.forEach((post) => {
  /*if (i > 0) {
    return false
  }*/
  const jsonData = {}
  jsonData._type = 'post'
  jsonData.title = post.title ? post.title : undefined
  if (post.slug) {
    jsonData.slug = {_type: 'slug', current: post.slug}
  }
  jsonData.date = convertToISO8601(post.publish_date)
  jsonData.content = post.content ? parseBody(post.content) : undefined
  jsonData.excerpt = post.short_description
    ? post.short_description.replace(/(<([^>]+)>)|\&nbsp;/gi, '')
    : undefined

  if (post.image) {
    jsonData.coverImage = {
      _type: 'image',
      _sanityAsset: `image@${`${post.image}`}`,
    }
  }

  // Modify or process the jsonData here as needed
  jsonData.seo = {}
  jsonData.seo.metaTitle = post.meta_title || undefined
  jsonData.seo.metaDesc = post.meta_description || undefined

  if (post.blog_post_author) {
    const authorID = post.blog_post_author.slug.replace(/[à-ü]|[À-Ü]/g, '')
    if (!createdAuthor.includes(authorID)) {
      const authorLine = {
        _type: 'author',
        _id: authorID,
        name: post.blog_post_author.display_name,
        content: post.blog_post_author.bio ? parseBody(post.blog_post_author.bio) : undefined,
        picture: {
          _type: 'image',
          _sanityAsset: `image@${post.blog_post_author.avatar}`,
        },
      }
      writeStream.write(`${JSON.stringify(authorLine)}\n`)
      createdAuthor.push(authorID)
    }
    jsonData.author = {
      _type: 'reference',
      _ref: authorID,
    }
  }

  if (post.categories) {
    jsonData.categories = []
    post.categories.split(',').forEach((category) => {
      const categoryID = category
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[à-ü]|[À-Ü]/g, '')
      if (!createdCategories.includes(categoryID)) {
        const categoryLine = {
          _type: 'postCategory',
          _id: categoryID,
          title: category,
          slug: {_type: 'slug', current: categoryID},
        }
        writeStream.write(`${JSON.stringify(categoryLine)}\n`)
        createdCategories.push(categoryID)
      }
      jsonData.categories.push({
        _type: 'reference',
        _ref: categoryID.toString(),
      })
    })
  }

  // Convert the modified JSON back to a string and write it to the output file
  const modifiedLine = `${JSON.stringify(jsonData)}\n`
  writeStream.write(modifiedLine)
  i++
})
writeStream.end() // Close the output file
console.log('Finished processing and writing the NDJSON file.')
