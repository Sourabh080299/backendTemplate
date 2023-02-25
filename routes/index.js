const express = require('express');
const postsRoutes = require('./posts.routes');
const homeRoutes = require('./home.routes');
const usersRoutes = require('./auth.routes');
const productRoutes = require('./products.routes');
const cartRoutes = require('./cart.routes');
const servicesRoutes = require('./services.routes');
const router = express.Router();

const defaultRoutes = [
    {
        path : '/',
        route : homeRoutes,
    },
    {
        path : '/services',
        route : servicesRoutes

    },
    {
        path : '/posts',
        route : postsRoutes,
    },
    {
        path : '/users',
        route : usersRoutes,
    },
    {
        path : '/products',
        route : productRoutes,
    },
    {
        path : '/cart',
        route : cartRoutes
    }
];

defaultRoutes.forEach((route)=>{
    router.use(route.path,route.route);
});


module.exports = router;