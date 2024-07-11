const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    imageURL:{type: 'string', required: true},
    price:{type:Number, required: true},
    name:{type: 'string', required: true},
    description:{type: 'string', required: true}
    
})
module.exports=mongoose.model('Product',productSchema);