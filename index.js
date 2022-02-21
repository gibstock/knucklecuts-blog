'use strict';
const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path');
const marked = require('marked')
const PORT = process.env.PORT || 5858
const convert = require('./public/js/test')
const URL = 'https://knuckle-cuts-db.herokuapp.com/api/blogs?populate=*'

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
  axios.get(URL)
    .then(response => {
        res.render('pages/index', {
          "data": response.data.data,
          "port": PORT,
          "convert": convert.formatDate,
          "url":"https://knuckle-cuts-db.herokuapp.com"
        })
    })
    .catch(err => console.error(err))
})

app.get('/articles/:id', (req, res) => {
  axios.get(URL)
    .then(response => {
      response.data.data.map((item) => {
        let unmarked = item.attributes.content
        if(req.params.id === item.attributes.slug) {
          res.render('pages/blog-template', {
            "title": item.attributes.title,
            "author": item.attributes.author,
            "content": marked.parse(unmarked),
            "photo": item.attributes.cover.data.attributes.formats.thumbnail.url,
            "port": PORT,
            "url": 'https://knuckle-cuts-db.herokuapp.com',
            "time": convert.formatDate(item.attributes.publishedAt),
            "related": item.attributes.relatedPosts.intro,
            // SEO
            "description": item.attributes.seo.metaDescription,
            "keywords": item.attributes.keywords,
            "shareImage": item.attributes.cover.data.attributes.formats.thumbnail.url,
            "metaTitle": item.attributes.seo.metaTitle,
            "preventIndexing": item.attributes.preventIndexing,
          })
        }
      })
    })
})
  
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))