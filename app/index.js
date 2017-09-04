let routes = []
const normalizedPath = require('path').join(__dirname, '/api')
require('fs').readdirSync(normalizedPath).forEach(function (file) {
  var Cls = require(`./api/${file}`).default
  var cls = new Cls()
  routes.push(cls.generate())
})

const app = (app) => {
  routes.forEach(route => {
    app.use(route)
  })
}

export default app
