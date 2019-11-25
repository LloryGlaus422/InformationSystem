const query = require('./ModelInquery.js');

function findOrgOne(namei) {
    return new Promise((resolve, reject)=>{
        query.findOne({name:namei},(err,dbres) =>{
            if(err){
                reject(err);
            }else{
                resolve(dbres);
            }
        })
    })
}

function All() {
    return new Promise((resolve, reject)=>{
        query.find({},(err,dbres) =>{
            if(err){
                reject(err);
            }else{
                resolve(dbres);
            }
        })
    })
}


function Update(namei) {
    return new Promise((resolve, reject)=>{
        query.updateOne({name:namei},(err,dbres) =>{
            if(err){
                reject(err);
            }else{
                resolve(dbres);
            }
        })
    })
}

function Delete(namei) {
    return new Promise((resolve, reject)=>{
        query.deleteOne({name:namei},(err,dbres) =>{
            if(err){
                reject(err);
            }else{
                resolve(dbres);
            }
        })
    })
}

module.exports = {
    findOrgOne,
    All,
    Update,
    Delete
}

