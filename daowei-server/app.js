var express = require('express');

//引入路由
var router = require('./routes/route.js')

var app = express();

const cors = require('cors')
app.use(cors())
app.use(express.static("public"));

app.use(router)


app.listen(3001,function () {
  console.log("数据库连接成功，端口号3001");
})
