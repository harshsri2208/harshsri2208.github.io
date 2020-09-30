/* ----------------------- Imports ---------------------- */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs');
const bodyParser = require('body-parser');

/* ----------------- Basic Server Config ---------------- */

const app = express();
const PORT = process.env.PORT || 3000;
const startTime = new Date();


/* ------------ Express Router Setup ----------- */

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

/* ----------------------- Routes ----------------------- */

const mainRouter = require('./routes/main');

app.use('/', mainRouter);


/* ------------------ Test Route Setup ------------------ */

app.route('/api').get((req, res) => {
    res.send("Server started successfully on " + startTime);
});

/* --------------------- Run Server --------------------- */

app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${ PORT }`);
});