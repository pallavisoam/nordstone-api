const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.options('*', cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log('this is my own middleware')
    next()
})

app.get('/', (req, res) => {
    res.json('you hit the api.')
})

const calculateData = (value1, value2, operation) => {
    return new Promise((resolve, reject) => {
        if (operation === 'Addition') {
            const finalOutput = Number(value1) + Number(value2)
            resolve(finalOutput)
        } else if (operation === 'Subtraction') {
            const finalOutput = Number(value1) - Number(value2)
            resolve(finalOutput)
        } else {
            const finalOutput = value1 * value2
            resolve(finalOutput)
        }
    })
}

app.post('/api/calculator-api', (req, res) => {
    const data = req.body
    calculateData(data.value1, data.value2, data.operation).then((data) => {
        res.status(200).send({ data: data })
    })
})

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port}`))
