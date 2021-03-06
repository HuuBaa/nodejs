var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Goods=require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on('connect',()=>{
  console.log('mangodb connect success');
});
mongoose.connection.on('disconnect',()=>{
  console.log('mangodb connect error');
});
mongoose.connection.on('error',()=>{
  console.log('mangodb disconnect');
});


router.get('/', function(req, res, next) {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let sort = req.query.sort;
  let skip = (page - 1) * pageSize;
  let priceLevel=req.query.priceLevel;
  let priceGt='';
  let priceLte='';
  let params={};
  if(priceLevel!=='all'){
    switch (priceLevel){
      case '0':priceGt=0;priceLte=100;break;
      case '1':priceGt=100;priceLte=500;break;
      case '2':priceGt=500;priceLte=1000;break;
      case '3':priceGt=1000;priceLte=5000;break;
    }
    params = {
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    };
  }

  let goodModel = Goods.find(params).skip(skip).limit(pageSize);
  if (sort){
    goodModel.sort({'salePrice': sort});
  }
  goodModel.exec((err,doc)=>{
      if(err){
        res.json({
          status:'1',
          msg:err.message
        })
      }else{
        res.json({
          status:'0',
          msg:'',
          result:{
            count:doc.length,
            list:doc
          }
        })
      }
    }
  );
});
module.exports = router;
