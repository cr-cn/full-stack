const serialize = require('serialize-javascript')
const ejs = require('ejs')
const asyncBootstrap = require('react-async-bootstrapper').default
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    const routerContext = {}
    const stores = createStoreMap()
    const app = createApp(stores, routerContext, req.url)

    const getStoreState = stores =>
      Object.keys(stores).reduce((result, storeName) => {
        result[storeName] = stores[storeName].toJson()
        return result
      }, {})

    asyncBootstrap(app)
      .then(() => {
        if (routerContext.url) {
          res.status(302).setHeader('Location', routerContext.url)
          res.end()
          return
        }
        const helmet = Helmet.rewind()
        const state = getStoreState(stores)
        const content = ReactDomServer.renderToString(app)

        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state),
          meta: helmet.meta.toString(),
          title: helmet.title.toString(),
          link: helmet.link.toString(),
          style: helmet.style.toString()
        })

        res.send(html)
        resolve()
      })
      .catch(reject)
  })
}
