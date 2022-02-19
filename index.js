'use strict';
const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path');
const marked = require('marked')
const port = process.env.port || 5858
const convert = require('./public/js/test')
const URL = 'https://knuckle-cuts-db.herokuapp.com/api/blogs?populate=*'

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
  axios.get(URL)
    .then(response => {
        res.render('pages/index', {
          "data": response.data.data,
          "port": port,
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
            "content": marked.parse(unmarked),
            "photo": item.attributes.cover.data.attributes.formats.small.url,
            "port": port,
            "url": 'https://knuckle-cuts-db.herokuapp.com',
            "time": convert.formatDate(item.attributes.publishedAt),
            "related": item.attributes.relatedPosts.intro,
            // SEO
            "description": item.attributes.seo.metaDescription,
            "keywords": item.attributes.keywords,
            "shareImage": item.attributes.cover.data.attributes.formats.small.url,
            "metaTitle": item.attributes.seo.metaTitle,
            "preventIndexing": item.attributes.preventIndexing,
          })
        }
      })
    })
})
  
app.listen(port, () => console.log(`http://localhost:${port}`))