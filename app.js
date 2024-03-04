const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { promises } = require('dns');

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); // It create userId field in products table
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User); // It create userId field in carts table
Cart.belongsToMany(Product, { through: CartItem }); // It create productId field in cartItems table
Product.belongsToMany(Cart, { through: CartItem }); // It create cartId field in cartItems table

// It create table for your define Models using sequelize.define() 
sequelize
    // force: true => create table whenever it run and delete table if it already exists else it overwrites it
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
        console.log(result);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Parth', email: 'parthkunjadiya3@gmail.com' });
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });