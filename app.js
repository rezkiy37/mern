const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')
const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (procces.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'clinet', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000
const mongoURI = config.get('mongoURI')

async function start() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit()
    }
}

start()

app.listen(5000, () => console.log(`App has been started on port ${PORT}...`))