const express = require('express');
const mongoose = require('mongoose');
const route= require('./controllers/control');
const User=require('./models/data')
const app = express()
const http = require("http");
const server = http.createServer(app);

app.use(express.json())
app.use('/start',route)
mongoose.set("strictQuery", false)

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const uri ="mongodb+srv://vikram24:YiFret2Glb1KapXQ@cluster0.pwfx8lq.mongodb.net/test";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
    console.log(`Node API app is running on port 3000`)
  })
.catch(err => console.log(err))

