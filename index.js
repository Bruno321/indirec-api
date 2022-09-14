require("dotenv").config();
const express = require('express')
const cors = require('cors')
const {db} = require('./config')
const mainRouter = require('./mainRouter')
const expressFileUpload = require('express-fileupload');

db.sync()
    .then(() => console.log('DB connected'))
    .catch(console.log);
require('./models')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

app.use('/api', mainRouter) // Main router

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}.`);
});