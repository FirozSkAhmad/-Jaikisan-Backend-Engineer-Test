const express = require('express');
const route = require('./routes.js');
const app = express();
const mongoose = require("mongoose")
app.use(express.json());
app.use(multer().any())
require("dotenv").config()

mongoose.connect((process.env.MONGO_CLUSTER || "mongodb+srv://Salman:g0Yrkp0tTQ2sVPBP@cluster0.eekagxa.mongodb.net/kisan"), {
    useNewUrlParser: true
})
.then(() => console.log("MongoDb is connected"))
.catch(err => console.log(err))


app.use('/', route);

app.use("/*", function (req, res) {
    return res.status(400).send({ status: false, message: "invalid request params (path not found)" })
});

app.listen((process.env.PORT || 3000), function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
