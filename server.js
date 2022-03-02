const dependencies = require('./dependencies')
const app = dependencies.express()
const router = require('./network/routes')
const cors = dependencies.cors
const config = require('./config')

app.use(dependencies.express.json())
app.use(cors())

router(app)

app.listen(config.PORT, () => {
    console.log(`App running at http://localhost:${config.PORT}`)
})

console.log('The used host is', config.HOST)