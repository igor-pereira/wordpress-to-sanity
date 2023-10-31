function convertToISO8601(dateString) {
  /*const parts = dateString.split('/')
  if (parts.length === 3) {
    const day = parts[0]
    const month = parts[1]
    const year = parts[2]

    // Ensure that day, month, and year are two digits each
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

    return formattedDate
  }
  // Handle invalid input
  return null*/

  const date = new Date(dateString)

  // Convert the date to an ISO 8601 string
  const iso8601String = date.toISOString()
  return iso8601String
}
module.exports = (dateString) => convertToISO8601(dateString)
