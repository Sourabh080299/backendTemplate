const express = require('express');
const posts = require('./posts.routes');
const home = require('./home.routes');
const users = require('./auth.routes');
const product = require('./products.routes');
const cart = require('./cart.routes');
const router = express.Router();

const defaultRoutes = [
    {
        path : '/',
        route : home,
    },
    {
        path : '/posts',
        route : posts,
    },
    {
        path : '/users',
        route : users,
    },
    {
        path : '/products',
        route : product,
    },
    {
        path : '/cart',
        route : cart
    }
];

defaultRoutes.forEach((route)=>{
    router.use(route.path,route.route);
});


module.exports = router;