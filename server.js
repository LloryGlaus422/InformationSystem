const port = 8000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const account = require('./scripts/createAccount');
const login = require('./scripts/login');
const quer = require('./scripts/createQuery');
const dbConfig = 'mongodb://127.0.0.1:27017/WeOrg';
const db = mongoose.connection;
const action = require('./scripts/actionAccount');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("Connected to dbs.");
}).catch(err => {
  console.log('Cannot connect to dbs.', err);
  process.exit();
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/query', function (req, res) {
  quer.create(req, res);
});

app.get('/query/retrieve', function (req, res, err) {
  const name = req.body.name;
  if (name) {
    quer.findOne(req, res, name);
  } else if (name == undefined) {
    quer.findAll(req, res);
  } else {
    err;
  }
})

app.put('/query/update/:name', function (req, res) {
  const name = req.params.name;
  quer.update(req, res, name)
})


app.delete('/query/delete/:name', function (req, res) {
  const name = req.params.name;
  quer.delete(req, res, name);
})

// for log in
// app.post('/login',(req,res) =>{
//   login.find((err, loginyou) => {
//     if (err){
//       return res.send(err);
//     }
//     res.send(loginyou)
//   })
// })
// for accoutns

app.post('/account', function (req, res) {
  account.create(req, res);
  console.log(req.body)
});

app.post('/retrieveOne/:name', function (req, res) {
  const namei = req.params.name;
  console.log(namei)
  if (namei != undefined) {
    action.findOrgOne(namei).then(resp => {
      res.send(resp)
    }).catch(err => {
      res.send(err)
    })
  }

})

app.post('/retrieveAll', function (req, res) {
  action.All().then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})


app.put('/Update/:name', function (req, res) {
  const namei = req.params.name;
  action.Update(namei).then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})

app.delete('/Delete/:name', function (req, res) {
  const namei = req.params.name;
  action.Delete(namei).then(resp => {
    res.send(resp)
  }).catch(err => {
    res.send(err)
  })
})


app.get('/login', function(req, res){
  console.log(req.body)
  const namei = req.params.name;
  const passwordi = req.params.password;
  console.log(namei,passwordi)
  if (namei != undefined && passwordi !=undefined) {
    login.findOne(namei).then(resp => {
      res.send(resp)
    }).catch(err => {
      res.send(err)
    })
  }
});

app.post('/login', function(req, res){
  console.log(req.body)
  if(!req.body.name || !req.body.password){
     res.render('login', {message: "Please enter both id and password"});
  } else {
    account.filter(function(user){
        if(user.name === req.body.name && user.password === req.body.password){
           req.session.account = account;
           res.send('fdsajfdksj');
        }
     });
     res.render('login', {message: "Invalid credentials!"});
  }
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});