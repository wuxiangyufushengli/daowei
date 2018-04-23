var express = require('express');
var router = express.Router();

var index = require('../data/index.json');
var comments = require('../data/comment.json');
var item = require('../data/item.json');
var service = require('../data/service.json');




//创建路由
//首页
router.get('/index',function (req,res) {
  res.send(index)
})
//服务商
router.get('/service',function (req,res) {
  res.send(service)
})
//评价
router.get('/comment',function (req, res) {
  var page = req.query.page/1;
  console.log(page);
  //var comment = comments.slice(page*10,10*(page+1))
  res.send(comments)
})
//商家信息
router.get('/item',function (req, res) {
  res.send(item)
})

//暴露
module.exports = router;