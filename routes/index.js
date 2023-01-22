const express = require('express');
const posts = require('./posts.route');
const home = require('./home.route');
const users = require('./auth');
const product = require('./products.route');
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
    }
];

defaultRoutes.forEach((route)=>{
    router.use(route.path,route.route);
});


module.exports = router;