const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { uuid } = require('uuidv4');

const createCustomers = (req, res)=>{
    const {product, token} = req.body;
    const idempontencyKey = uuid();
    stripe.customers.create({
        email: token.email,
        source : token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: product.price*10,
            currency : 'usd',
            customer : customer.id,
            receipt_email : token.email,
            description : `purchase of ${product.name}`,
            shipping : {
                name : token.card.name,
                address : {
                    country : token.card.address_country
                }
            }
        }, {idempontencyKey});
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json({
            error : error.message
        })
    });
}

module.exports = {
    createCustomers,
}