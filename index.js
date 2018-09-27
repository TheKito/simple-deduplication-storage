'use strict';

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

var rootPath              = '/tmp/';
var idAlgorithm           = 'sha1';
var keyAlgorithm          = 'sha256';
var cryptAlgorithm        = 'aes-256-ctr';

module.exports = {
    /**
    * Set storage root
    * @param {string} storagePath
    */
    setPath: function (storagePath)
    {
        rootPath = path.normalize('/'+storagePath) + '/';
    },
    /**
    * Set hash algorithm name for id
    * @param {string} algorithmName
    */
    setAlgorithmId: function (algorithmName)
    {
        crypto.createHash(algorithmName).update('').digest();
        idAlgorithm = algorithmName;        
    },
    /**
    * Set hash algorithm name for key
    * @param {string} algorithmName
    */
    setAlgorithmKey: function (algorithmName)
    {
        crypto.createHash(algorithmName).update('').digest();
        keyAlgorithm = algorithmName;
    },        
    /**
    * Set algorithm name for crypto
    * @param {string} cryptAlgorithmName
    */
    setAlgorithmCrypt: function (algorithmName)
    {
        cryptAlgorithm = algorithmName;
    },        
    /**
    * Storage buffer
    * @param {buffer} buffer
    * @returns {id,key} 
    */    
    putData: function (buffer)
    {
        var id = getId(buffer);
        var key = getKey(buffer);

        fs.writeFileSync(getPath(id),encrypt(key,buffer));

        var result = {};        
        result.id   = id;
        result.key  = key;
        return result;
    },
    /**
    * Storage buffer
    * @param {buffer} id
    * @param {buffer} key
    * @returns {buffer} 
    */      
    getData: function (id, key)
    {
        var buffer = decrypt(key,fs.readFileSync(getPath(id)));;

        if(getId(buffer).equals(id))
            return buffer;
        else
            return null;
    },         
    /**
    * Storage buffer
    * @param {buffer} id
    * @returns {boolean} 
    */         
    existsData: function (id)
    {
        return fs.existsSync(getPath(id));
    }
};


function calcHash(algorithmName,data){return crypto.createHash(algorithmName).update(data).digest();}
function getIV(key){return calcHash(keyAlgorithm,key).slice(0,16);}
function getCipher(key){return crypto.createCipheriv(cryptAlgorithm,key,getIV(key));}
function getDecipher(key){return crypto.createDecipheriv(cryptAlgorithm,key,getIV(key));}
function encrypt(key,buffer){
  var cipher = getCipher(key);
  return Buffer.concat([cipher.update(buffer),cipher.final()]);
}
function decrypt(key,buffer){
  var decipher = getDecipher(key);
  return Buffer.concat([decipher.update(buffer), decipher.final()]);
}    
function getId(buffer){return calcHash(idAlgorithm,buffer);}    
function getKey(buffer){return calcHash(keyAlgorithm,buffer);}
function createDir(path)
{
    if(fs.existsSync(path))
        return true;
    
    fs.mkdirSync(path);
    
    return fs.existsSync(path);
}
function getPath(id)
{
    var path = rootPath;
    var idHex = id.toString('hex').toUpperCase();
    for (var i = 65; i < 71; i++) 
        if(idHex.indexOf(String.fromCharCode(i)) > -1)
        {
            path += String.fromCharCode(i) + '/';
            createDir(path);
        }        
    return path + idHex;
}
