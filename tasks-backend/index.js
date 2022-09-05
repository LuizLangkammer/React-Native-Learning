
//config inicial
const express = require('express')
const app = express()
const mongoose  = require('mongoose');
const consign = require('consign');



consign()
    .then('./src/api')
    .then('./src/config/middlewares.js')
    .then('./src/config/routes.js')
    .into(app)



mongoose.connect(
    'mongodb+srv://adminbatrix:batrix@apicluster.rcscbmb.mongodb.net/tasks?retryWrites=true&w=majority'
)
.then(() => {
    console.log("MongoDb connected!");
    app.listen(3000);
})
.catch((err) => {
    console.log(err)
})

