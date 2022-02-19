 function formatDate(value, locale = 'en-US') {
    return new Date(value).toLocaleDateString(locale)
}

exports.formatDate = formatDate
