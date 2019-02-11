var express = require('express');
var router = express.Router();

module.exports = {
	dash: function(req, res){
		var QRCode = require('qrcode')
 
		QRCode.toDataURL(`http://172.16.10.13:3000/sockets?n=2&a=1`,{
			scale:7,
			
		})
		.then(url => {
		  res.render('viewQr.ejs',{
			'imagensita':url
		})
		})
		.catch(err => {
		  console.error(err)
		})

	}
}