const express = require('express')
const app = express()
const port = 3000


const generalRouter = require("./src/routers/general");



app.use("/api",generalRouter);


app.listen(port, () => {
  console.log(`Run at http://localhost:${port}`)
})