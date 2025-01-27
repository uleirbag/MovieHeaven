require('dotenv').config({ path: '../.env' });

const express = require('express');
const httpLogger = require('morgan');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

// middlewares
app.use(httpLogger('dev'));
app.use(cors()) 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server-ul Express a pornit cu succes :D')
});

app.listen(port, () => {
  console.log(`Serverul ruleaza pe portul ${port}!`)
});

// Firebase
const { db, auth } = require('../firebase_config/firebaseAdmin.js');

