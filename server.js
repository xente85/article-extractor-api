import { extractFromHtml } from '@extractus/article-extractor'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000
const host = process.env.IP

app.use(express.json())

app.post('/', async (req, res) => {
  console.log(req.body);
  const data = req.body;
  
  try {
    // const article = await extract(data.link)

    const fetchLink = await fetch(data.link)
    const buffer = await fetchLink.arrayBuffer()
    const decoder = new TextDecoder('utf-8')
    const html = decoder.decode(buffer)
    const article = await extractFromHtml(html)

    res.json(article)
  } catch (error) {
    res.json({ error })
  }
})

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})