/**
 * Created by Administrator on 2017/9/14 0014.
 */
var express = require("express");
var app = express();

var router = require("./controller");
app.set("view engine","ejs");

app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.get("/",router.showIndex);
app.get("/up",router.showUpload);
app.get("/:albamName",router.showImg)

app.post("/upload",router.doPost);
app.use("/",function(req,res){
    res.send("成功启动");
});
app.listen(3030);