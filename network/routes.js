const componentsNetwork = require('../components/network')

const routes = function (server){
    server.use('/api', componentsNetwork)
}

module.exports = routes