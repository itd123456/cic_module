const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 2030

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (err) =>{
    if(err) throw err
    console.log("MongoDB connection established!");
});

app.use("/user", require("./routes/user.routes"));
app.use("/api", require("./routes/sofia.routes"));