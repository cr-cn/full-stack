const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFS = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () =>
  new Promise((resolve, reject) => {
    axios
      .get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })

const Module = module.constructor
const mfs = new MemoryFS()

const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  // 编码格式
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  // 这是 compile 一定要指定文件名
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

module.exports = app => {
  app.use(
    '/public',
    proxy({
      target: 'http://localhost:8888'
    })
  )
  app.get('*', function (req, res) {
    getTemplate().then(template => {
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->', content))
    })
  })
}
