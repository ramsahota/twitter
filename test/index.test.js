var main = require('../db.js');
var assert = require('assert');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should(); //allows you to use should in promise.should.be.fulfilled

describe('test db', function() {
    // it('tests the assert equal function', function () {
    //     assert.equal(3,3);
    // });
    // it('first test that checks if the function can read', function(done){
    //     main.query(function(err,data){
    //         //test for processing error
    //         if(err){
    //             done(err);
    //             return;
    //         }
    //         //test for validity 
    //         try {
    //             console.log(data);
    //             assert.notEqual(data,null);
    //             done();
    //             //if the assertion failed
    //         } catch(exception) {
    //             done(exception);
    //             return;
    //         }
    //     },'user');
    // });
    it('second test that checks if the function can read', function(){
        return main.query('user').should.eventually.be.fulfilled;
    });
});
