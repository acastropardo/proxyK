
var express = require('express');
var app = express();

var router = express.Router();
var session = require('express-session');
var request = require('request');

var login = 'Basic YWNhc3RybzpQaHIyMDE4Iw==';
var urlPeriodos = 'http://vm-kfmfiori.grupokaufmann.com:8000/sap/opu/odata/sap/ZHR_TEST_PDF_SRV/periodosCollection?$format=json';
var urlPDF = "http://vm-kfmfiori.grupokaufmann.com:8000/sap/opu/odata/sap/ZHR_TEST_PDF_SRV/boletaPagoCollection(Pernr='30009203',Pabrp='01',Pabrj='2015')";
var empleadoTemp = '30009203';
var pabrp;
var pabrj;
var pernr;


router.get('/pdf', function(req, res){
//Lets configure and request
request({
    url: urlPDF, //URL to hit
    //qs: {from: 'example', time: +new Date()}, //Query string data
    method: 'GET', // specify the request type
    headers: { // speciyfy the headers
        'Authorization': login,
        'Custom-Header': 'Custom Value'
    },
    //body: 'Hello Hello! String body!' //Set the body as a string
}, function(error, response, body){
    if(error) {
        console.log('Hora: ', Date.now());
        console.log(error);
    } else {
        console.log('Hora: ', Date.now());
        console.log(response.statusCode);
        console.log(body);

        //var username = JSON.parse(body).username;
        //console.log(body.username);
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    }


});
});

router.get('/periodos', function(req, res){
//Lets configure and request
request({
    url: urlPeriodos, //URL to hit
    //qs: {from: 'example', time: +new Date()}, //Query string data
    method: 'GET', // specify the request type
    headers: { // speciyfy the headers
        'Authorization': login,
        'Custom-Header': 'Custom Value'
    },
    //body: 'Hello Hello! String body!' //Set the body as a string
}, function(error, response, body){
    if(error) {
    	console.log('Hora: ', Date.now());
        console.log(error);
    } else {
        //console.log(response.statusCode);
        //console.log(body);

        //var username = JSON.parse(body).username;
        //console.log(body.username);
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
    }


});
});

module.exports = router;