const fs = require('fs')

// Read the JSON file
const rawData = fs.readFileSync('productos_strapi_old.json')
const jsonArray = JSON.parse(rawData)

// Create an array of objects with shopify_id as the key
const transformedArray = jsonArray.map((item) => {
  const shopifyId = item.shopify_id
  delete item.shopify_id // Remove shopify_id from the properties
  return {[shopifyId]: item}
})

// Convert the transformed array to JSON
const transformedJSON = JSON.stringify(transformedArray, null, 2)

// Write the transformed JSON to a new file
fs.writeFileSync('produtos_strapi.json', transformedJSON)

console.log('Transformation completed. Check transformed.json')
