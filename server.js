const request = require('request')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const makeApiCall = (url) => {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      if (err) reject(err)
      resolve(body)
    })
  })
}

app.set('port', process.env.PORT || 3001)
app.locals.title = 'floristic'


app.get('/plant/:id', (req, res) => {
  const { id } = req.params

  const url = `https://trefle.io/api/v1/plants/${id}?token=w76udTztX_89MySv3fO4fG41HD2yq9xhIRETq1KCXCg`

  makeApiCall(url)
    .then(response => res.json(response))
    .catch(error => res.send(error))
})

app.get('/plants/search/:query/:page', (req, res) => {
  const { query } = req.params
  const { page } = req.params

  const url = `https://trefle.io/api/v1/plants/search?page=${page}&q=${query}&token=w76udTztX_89MySv3fO4fG41HD2yq9xhIRETq1KCXCg`

  makeApiCall(url)
    .then(response => res.json(response))
    .catch(error => res.send(error))
})

app.get('/plants/:page', (req, res) => {
  const { page } = req.params
  const url = `https://trefle.io/api/v1/plants?page=${page}&token=w76udTztX_89MySv3fO4fG41HD2yq9xhIRETq1KCXCg`

  makeApiCall(url)
    .then(response => res.json(response))
    .catch(error => res.send(error))
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});