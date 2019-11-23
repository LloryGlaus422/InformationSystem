const login = require('./loginmodel.js');

module.exports.findAll = (reqEmail,reqPass, res) => {
    login.find({email:reqEmail , password: reqPass},(err,data)=>{
        if (err){
            res.send(err);
        }
        res.send(data)
    })
};
