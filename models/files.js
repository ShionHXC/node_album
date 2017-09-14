/**
 * Created by Administrator on 2017/9/14 0014.
 */
var fs = require("fs");
exports.showFields = function(field,callback){
    fs.readdir("./"+field,function(err, files){
        if(err){
            callback(null);
            return;
        }
        var allFields = [];
        (function iterator(i){
            if(i == files.length){
                callback(allFields);
                return;
            }else{
                fs.stat("./"+field + "/" +files[i],function(err,stats){
                    if(stats.isDirectory()){
                        allFields.push(files[i]);
                    }
                    iterator(i+1);
                })
            }
        })(0)
    })
};
// 查出文件夹里的图片
exports.showFiles = function(field,callback){
    console.log(field);
    var path = "./uploads/" + field;
    fs.readdir(path,function(err,files){
        var imgArr = [];
        if(err){
            callback(imgArr);
            return;
        }
        (function iterator(i){
            if(i == files.length){
                callback(imgArr);
                return;
            }else{
                fs.stat("./uploads/"+field + "/" +files[i],function(err,stats){
                    if(stats.isFile()){
                        imgArr.push(files[i]);
                    }
                    iterator(i+1);
                })
            }
        })(0)
    })
}

