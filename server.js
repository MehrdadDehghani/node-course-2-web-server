const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var logText = `${now}: ${req.method}, ${req.url}`;
    console.log(logText);
    fs.appendFile('server.log', logText + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         maintenanceMsg: 'We will be back soon!'
//     })
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
    //res.send('<h1>hello express!<h1>');
    // res.send({
    //     name:'Mehrdad',
    //     likes:[
    //         'Biking',
    //         'Walking'
    //     ]
    // })
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about', (req, res) => {
    //res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.listen(3000, () =>{
    console.log('Server is up on port 3000');
});