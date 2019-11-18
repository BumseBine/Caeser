const caeser = require('./requirements/caeser-web').caeser;
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
app.set("view engine","ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use('/images', express.static('./static/images'));
app.use('/css', express.static('./static/css'));

app.get('/', (req, res) => {
    res.render('index');
})
app.post('/encrypt', (req, res) => {
    var text = req.body.text;
    text.replace('<', " ");
    text.replace('>', " ");
    var cipher = caeser(text,req.body.number);
    console.log(cipher);
    res.render('index', {
        encrypt: cipher.encryptedText,
        plain: cipher.plainText
    })
})
app.get('/decrypt', (req, res) => {
    res.render('decrypt');
});

app.post('/decrypt', (req, res) => {
    var text = req.body.text;
    text.replace('<', " ");
    text.replace('>', " ");
    var cipher = caeser(req.body.text,req.body.number*-1);
    console.log(cipher);
    res.render('decrypt', {
        encrypt: cipher.encryptedText,
        plain: cipher.plainText
    })
})

app.listen('500', () => {
    console.log('Server started on port 500')
})