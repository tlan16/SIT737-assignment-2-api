const Routes = require('./routes/index')

const routes = app => {
    app.get('/api/', (req, res) => {
        res.send(['Hello', 'API'])
    })

    Routes(app)
}

module.exports = app => {
    routes(app)
}