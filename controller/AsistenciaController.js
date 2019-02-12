var express = require('express');
var router = express.Router();

module.exports = {
	dash: function(req, res){
		var QRCode = require('qrcode')
 
		QRCode.toDataURL(`http://172.16.10.12:3000/sockets?e=17&s=5&c=45&p=8`,{
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