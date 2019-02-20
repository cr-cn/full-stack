const serialize = require('serialize-javascript')
const ejs = require('ejs')
const asyncBootstrap = require('react-async-bootstrapper').default
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const SheetsRegistry = require('react-jss').SheetsRegistry
const create = require('jss').create
const preset = require('jss-preset-default').default
const createMuiTheme = require('@material-ui/core/styles').createMuiTheme
const createGenerateClassName = require('@material-ui/core/styles/createGenerateClassName')
  .default
const colors = require('@material-ui/core/colors')

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    const routerContext = {}
    const stores = createStoreMap()
    const sheetsRegistry = new SheetsRegistry()
    const jss = create(preset())
    jss.options.createGenerateClassName = createGenerateClassName
    const theme = createMuiTheme({
      palette: {
        primary: colors.pink,
        accent: colors.lightBlue,
        type: 'light'
      }
    })
    const app = createApp(
      stores,
      routerContext,
      sheetsRegistry,
      jss,
      theme,
      req.url
    )

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
          style: helmet.style.toString(),
          materialCss: sheetsRegistry.toString()
        })

        res.send(html)
        resolve()
      })
      .catch(reject)
  })
}
