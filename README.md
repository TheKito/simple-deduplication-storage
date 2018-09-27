Simple Deduplication Storage
=========

A small library that storage and get buffer of data to file system with crypo

## Installation

  `npm install simple-deduplication-storage`

## Usage

    var sds = require('@andresrgard/simple-deduplication-storage');

    sds.setData(new Buffer("hello world", "utf8"))
    Returns {id:Buffer('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed','HEX'),key:Buffer('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9','HEX')}

    sds.existsData(new Buffer('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed','HEX'))
    Returns true
 
    sds.getData(new Buffer('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed','HEX'), new Buffer('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9','HEX'))
    Returns Buffer("hello world", "utf8")
  

## Tests

  `npm test`

