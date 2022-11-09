var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


//CONECTING DB// APP CONFI
mongoose.connect('mongodb+srv://Khoa21donga:Khoa21dongaKhoa21dongaKhoa21donga@cluster0.o9ivn6p.mongodb.net/test2?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false 
});

// create collection

let lopSchema = mongoose.Schema({
  IdDistrict: {
    type: String
  },
  IdVillage: {
    type: String
  },
  Address: {
    type: String
  },
  IsGetNotification: {
    type: String
  },
  IsVerified: {
    type: String
  },
  IsGetOpen: {
    type: String
  },
})

let Lop = mongoose.model('Lop', lopSchema)

/* GET home page. */
router.get('/', function(req, res, next) {
Lop.find({}, (Error, data)=>{
    console.log('User3', data);
    res.render('index', {lops:data} );
});
});

// form add
router.get('/form-add', function(req, res, next){
  res.render('form-add', {});
}); 
  router.post('/add',function(req, res, next){
    Lop.create(req.body);
    res.redirect('/');
});
// form update
router.get('/form-update/:id',function(req, res, next){
  console.log(req.body);
  Lop.findById(req.params.id,(error,data)=>{  
    res.render('form-update',{lops:data});
  });
});

router.post('/update',function(req, res, next){
  Lop.findByIdAndUpdate(req.body.id,req.body, (Error, data)=>{
    res.redirect('/');
  });
});
// delete
router.get('/form-delete/:id',function(req, res, next){
  Lop.findByIdAndDelete(req.params.id,(Error,data)=>{
    res.redirect('/');
  });
});
module.exports = router;
