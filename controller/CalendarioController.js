const express = require('express');
const mysql = require("../config/database")
const router = express.Router();
var crypto = require('crypto');
var assert = require('assert');

module.exports = {
    dash: function (req, res) {

        
        var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
        var key = '123456789-Aa';
        var text = 'Ha$lo Pablito el kpito';
        
        var cipher = crypto.createCipher(algorithm, key);  
        var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
        var decipher = crypto.createDecipher(algorithm, key);
        var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
        
        assert.equal(decrypted, text);
        console.log("Se viene la encriptada")
        console.log(encrypted)
        console.log("Se viene la desencriptada")

        console.log(decrypted)

        res.render('calen.ejs', {
            'prueba': "hola mundo"
        })
    },
    informacionDash: async function (req, res) {

        try {
            const dataBase = await mysql.conexionApp()
        } catch (error) {
            console.log(error)
        }

        res.send("datos")
    }
}