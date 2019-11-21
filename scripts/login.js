const login = require('./login.js');

module.exports.findAll = (req, res) => {
    login.findAll((err,data)=>{
        if (err){
            res.send(err);
        }
        res.send(data)
    })
};
