require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Number = require('./models/number')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'NotFoundError') {
    return response.status(404).json({ error: 'not found' })
  } else if (error.name === 'BadRequestError') {
    return response.status(400).json({ error: 'bad request' })
  } else if (error.name === 'InternalServerError') {
    return response.status(500).json({ error: 'internal server error' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.get('/api/persons', (req, res, next) => {
  Number.find({}).then(persons => {
    res.json(persons)
  })
    .catch(error => {
      next(error)
    })
})

app.get('/info', (req, res) => {
  const date = new Date()

  Number.countDocuments({}).then(count => {
    res.send(`Phonebook has info for ${count} people </br> ${date}`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Number.findById(id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Number.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  const person = new Number({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const id = req.params.id

  Number.findById(id)
    .then(person => {
      if (!person) {
        return res.status(404).end()
      }
      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})