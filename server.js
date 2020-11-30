const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const url = require('./models/url')

dotenv.config({ path: './config.env' });

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const allUrls = await url.find()
  res.render('index', { allUrls: allUrls.reverse() })
})
app.get('/:shortUrl', async (req, res) => {
  const item = await url.findOne({ short: req.params.shortUrl })
  item.clicks++
  item.save()
  res.redirect(item.full)
})
app.post('/shortUrls', async (req, res) => {
  await url.create({
    full: req.body.fullUrl
  })
  res.redirect('/')
})
app.delete('/delete/:shortUrl', async (req, res) => {
  const item = await url.findOne({ short: req.params.shortUrl })
  item.deleteOne()
  res.status(204).json({
    status: 'success',
    data: null
  });
});

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then((res) => console.log('DB connection successfull'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
