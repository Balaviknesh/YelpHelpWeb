var express = require('express');
var router = express.Router();
const {Firestore} = require('@google-cloud/firestore');
require('dotenv').config();
const firestore = new Firestore({keyFilename: process.env.KEYPATH});

router.get('/', (req, res) => {
  console.log(process.env.KEYPATH)
  res.send('api works');

});


router.post('/search_business', (req, res) => {
  if(req!= null) {
    rows = []
    var name = req.body.name
    let query = firestore.collection('business').where('name', '==', name);
    query.limit(100).get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        rows.push(documentSnapshot.data())
      });
      res.send({result:'Valid Request', status: true, output: rows});
    });
  }
  else{
    res.send({result:'Invalid Request', status: false});
  }

});

module.exports = router;
