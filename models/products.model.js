const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 3,
        max : 1000
    },
    description : {
        type : String,
        required : true,
        min : 10,
        max : 10000
    },
    price : {
        type : Number,
        reuired : true
    },
    discount : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    category : {
        type : String
    }
}
)

module.exports = mongoose.model('products',productSchema);