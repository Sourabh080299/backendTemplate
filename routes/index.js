const express = require('express');
const posts = require('./posts.route');
const home = require('./home.route');

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
];

defaultRoutes.forEach((route)=>{
    router.use(route.path,route.route);
});


module.exports = router;