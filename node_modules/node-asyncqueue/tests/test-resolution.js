require ("assert");
var QueueManager = require("../index");
describe ("async func queue", function() {
  it ("should reject if ignore is set to false", function(done) {
    QueueManager.asyncFunctionQueue([
      new Promise(function(resolve, reject) {
        resolve();
      }),
      new Promise(function(resolve, reject) {
        reject(new Error("test error"));
      }),
    ])
    .then(() => {
      done(new Error("failed to reject"));
    })
    .catch(() => {
      done();
    });
  });



  it ("should resolve in order", function(done) {
    var orderTracker = 1;
    QueueManager.asyncFunctionQueue([
      new Promise(function(resolve, reject) {
        if (orderTracker !== 1) done(new Error("out of order"));
        resolve();
        orderTracker++;
      }),
      new Promise(function(resolve, reject) {
        if (orderTracker !== 2) done(new Error("out of order"));
        resolve();
      })
    ])
    .then(() => {
      done();
    })
    .catch((e) => {
      done(e);
    });
  });


  it ("should not reject, and should resolve completely if ignore is set to true", function(done){
    QueueManager.asyncFunctionQueue([
      new Promise(function(resolve, reject){
        resolve();
      }),
      new Promise(function(resolve, reject){
        reject();
      }),
      new Promise(function(resolve, reject){
        resolve();
      }),
    ], true
  ).then(() => {
    done();
  })
  .catch((e) => {
    done(e);
  });
  });


});
