const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var login = new Schema({
    email: { type: Schema.Types.ObjectId, 
        ref: 'NewOrg' },
    password: [{
        type: Schema.Types.ObjectId,
        ref: 'NewOrg'
    }]

})

module.exports = mongoose.model('LogIn', login);