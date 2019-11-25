const login = require('./ModelLogin.js');

function findOne(namei,passwordi) {
    return new Promise((resolve, reject)=>{
        login.findOne({name:namei,password:passwordi},(err,dbres) =>{
            if(err){
                reject(err);
            }else{
                resolve(dbres);
            }
        })
    })
}

module.exports = {
    findOne
}
