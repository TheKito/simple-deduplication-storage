'use strict';

var expect = require('chai').expect;
var sds = require('../index');

describe('simple-deduplication-storage', function() {
    it('get id from data', function() {
        var result = sds.putData(new Buffer("hello world", "utf8")).id.toString();
        expect(result).to.equal(new Buffer('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed','HEX').toString());
    });

    it('get key from data', function() {        
        var result = sds.putData(new Buffer("hello world", "utf8")).key.toString();
        expect(result).to.equal(new Buffer('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9','HEX').toString());
    });

    it('exists id', function() {
        var result = sds.existsData(new Buffer('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed','HEX'));
        expect(result).to.equal(true);
    });

    it('get data from id and key', function() {
        var result = sds.getData(new Buffer('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed','HEX'),new Buffer('b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9','HEX')).toString();
        expect(result).to.equal(new Buffer("hello world", "utf8").toString());
    });

});

