const express = require("express") 
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const session = require("express-session")
const routes = require("./routes")

const usePassport = require("./config/passport")
require("./config/mongoose")

const app = express()
const port = 3000

app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(session({
  secret: "ThisIsMySecret",
  resave: false,
  saveUninitialized: true
}))

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

usePassport(app)

app.use(routes)



app.listen(port, () => {
  console.log(`This Web Server is on : http://localhost:${port}`)
})