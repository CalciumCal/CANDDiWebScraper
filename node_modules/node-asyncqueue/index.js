/**
* @author Jack Considine <jackconsidine3@gmail.com>
* @package fca1.0.0
* 2017-11-16
*/


module.exports = {
  /**
   * takes array of promises. returns a promise for when all requests are finished
   * @param  {Array} asyncFuncArray
   * @param  {boolean} ignore whether to reject an error
   * @return {Promise}  Promise to resolve when all requests are finished
   */
  asyncFunctionQueue : function (asyncFuncArray, ignore) {
    return new Promise(function(resolve, reject) {
      var numRequests = asyncFuncArray.length;
      var requestsCompleted = 0;

      for (var i=0; i<numRequests; i++) {
        asyncFuncArray[i]
        .then(()=> {
          requestsCompleted+=1;
        })
        .catch((e) => {
          if (!ignore) reject(e);
          requestsCompleted++;
        })
        .then(() => {
          if (requestsCompleted === numRequests) resolve();
        });
      }
    });
  }
}
