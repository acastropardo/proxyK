
var express = require('express');
var app = express();

var router = express.Router();
var session = require('express-session');
var request = require('request');

var login = 'Basic YWNhc3RybzpQaHIyMDE4Iw==';
var urlPeriodos = 'http://vm-kfmfiori.grupokaufmann.com:8000/sap/opu/odata/sap/ZHR_TEST_PDF_SRV/periodosCollection?$format=json';
var urlPDF = "http://vm-kfmfiori.grupokaufmann.com:8000/sap/opu/odata/sap/ZHR_TEST_PDF_SRV/boletaPagoCollection(Pernr='30009203',Pabrp='01',Pabrj='2015')?$format=json";
var urlPDFBase64 = "http://vm-kfmfiori.grupokaufmann.com:8000/sap/opu/odata/sap/ZHR_TEST_PDF_SRV/empleadoCollection(Employeenumber='30009203',Pabrp='01',Pabrj='2015')/$value";
var empleadoTemp = '30009203';
var pabrp;
var pabrj;
var pernr;

//app.use('/', express.static('static'));

  var base64ToBuffer = function(base64) {

        var byteString = new Buffer(base64, 'base64').toString('binary');

        var ab = new Buffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return ab;
  }

  function parsePDF(stringValue) {

       var string = JSON.stringify(stringValue);
       var objectValue = JSON.parse(string);

       return objectValue['pdf'];
    }


router.get('/pdf', function(req, res){


//Lets configure and request
request({
    url: urlPDF, //URL to hit
    encoding: null,
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
        //console.log('Hora: ', Date.now());
        //console.log(response.statusCode);
        //console.log(body);

        var pdf = parsePDF(body);
        console.log(pdf);

        
        res.setHeader('Content-Type', 'application/json');
        //res.setHeader('Content-Type', 'application/pdf');
        
        /*var stream = require('stream');

        // Initiate the source
        var bufferStream = new stream.PassThrough();

        // Write your buffer
        bufferStream.end(new Buffer(body));

        // Pipe it to something else  (i.e. stdout)
        bufferStream.pipe(res)
        //res.pipe(body);*/
        //var buff = base64ToBuffer(body);
        res.send(pdf);

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

router.get('/pdfBase64', function(req, res){
//Lets configure and request
request({
    url: urlPDFBase64, //URL to hit
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
        res.setHeader('Content-Type', 'application/pdf');
        res.send(body);
    }


});
});
module.exports = router;