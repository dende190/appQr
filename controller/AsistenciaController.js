var express = require('express');
var router = express.Router();
var QRCode = require('qrcode')

module.exports = {
	dash: function(req, res){
		var io = req.app.get('socket.io'); 
		io.emit('profesor', { 
			id: req.query.id,
		});

		QRCode.toDataURL(`http://172.16.10.14:3000/sockets?e=17&s=5&c=45&p=8`,{
			scale:9,
			
		})
		.then(url => {
		  res.render('viewQr.ejs',{
			'imagensita':url
		})
		})
		.catch(err => {
		  console.error(err)
		})

	},
}