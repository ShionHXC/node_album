/**
 * Created by Administrator on 2017/9/14 0014.
 */
var files = require("./../models/files.js");
var formidable = require("formidable");
var sd = require('silly-datetime');
var path = require("path");
var fs = require("fs");
exports.showIndex = function(req,res){
    files.showFields("uploads",function(albums){
        res.render("index",{
            "albums" : albums
        });
    })
};

exports.showImg = function(req,res){
    var path = req.params.albamName;
    files.showFiles(path,function(images){
        res.render("album",{
            "images" : images
        })
    })
};

// 可上传的文件夹
exports.showUpload = function(req,res){
    files.showFields("uploads",function(fieldsArr){
        console.log(fieldsArr)
        res.render("upload",{
            "fieldsArr" : fieldsArr
        })
    })
}

// 上传
exports.doPost = function(req,res){
    var form = new formidable.IncomingForm();
    //上传文件夹的位置
    form.uploadDir = path.normalize(__dirname + "/../uploads");
    form.parse(req, function(err, fields, img, next) {
        if(err){
            next();
            return;
        }

        var size = img.pic.size;
        var tt = sd.format(new Date(),"YYYYMMDDHHmmss");
        var rander = parseInt(Math.random()*8999 + 10000);
        //扩展名
        var extname = path.extname(img.pic.name);
        var newPath = path.normalize(__dirname + "/../uploads/" + fields.field + "/" + tt + rander + extname);
        var oldPath = img.pic.path;

        /*if(size > 100000){
            res.send("上传图片文件过大");
            //删除图片
            return;
        }*/
        // 更名
        fs.rename(oldPath,newPath,function(err){
            if(err){
                res.send("上传是被")
            }
            res.send("上传成功")
        })

    });

    return;
}
