require('./startup/loggin')()
require('express-async-errors')

const config = require('./startup/config')
const app = require('express')()

require('./startup/db')()
require('./startup/routes')(app)

app.listen(config.port)
