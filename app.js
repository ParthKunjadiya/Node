const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

// here we set name as hbs so file extension can be .hbs
// const { engine } = require('express-handlebars'); then we can use => app.engine('hbs', engine({ layoutsDir: path.join(__dirname, '/views/layouts'), defaultLayout: 'main-layout', extname: 'hbs' }));

app.engine('hbs', expressHbs.engine({ layoutsDir: path.join(__dirname, '/views/layouts'), defaultLayout: 'main-layout', extname: 'hbs' }));
app.set('view engine', 'hbs');
// app.set('view engine', 'pug');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);