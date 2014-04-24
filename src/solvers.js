/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };


var range = function(n) {
  return _(_.range(n)).map(function() {
        return 0;
      });
};

var innerFunction = function(n) { // generates all array combinations
    var results = [];
    if (n === 1) {
      return [1];
    } else {
      
      var innerSolutions = innerFunction(n-1);
      var noInnerSolutions = innerSolutions.length;  //
      for (var col = 0; col < n; col++) { // may be more than one solution per col
          var topRow = range(col).concat([1]).concat(range(n-1-col));
          for(var m = 0; m < noInnerSolutions; m++) { // iterating through inner solutions array
          //iterate through no of arrays.length determined by the innerFunction(n-1)
          //loop to iterate through remainder of rows and push sub arrays to output
             var result = [];
             result.push(topRow);
             for( var i = 0 ; i < n - 1; i++) {
               if(Array.isArray(innerSolutions[m])) {
                result.push(innerSolutions[m][i].slice(n-col-1).concat(0).concat(innerSolutions[m][i].slice(col)));
               } else {
                if(col) {
                   result.push(innerSolutions.concat([0]));
                } else {
                   result.push([0].concat(innerSolutions));
                }
               }
             }
             results.push(result);
          }
      }
      return results;
    }
  };

window.findNRooksSolution = function(n) {
 // var solution = undefined; //fixme
  //push 1 to all elements
  // reset for each count 
 // var partial = [];// partial solutions
  
  // var innerFunction = function(n) { // generates all array combinations
  //   var results = [];
  //   if (n === 1) {
  //     return [1];
  //   } else {
      
  //     var innerSolutions = innerFunction(n-1);
  //     var noInnerSolutions = innerSolutions.length;  //
  //     for (var col = 0; col < n; col++) { // may be more than one solution per col
  //         var topRow = range(col).concat([1]).concat(range(n-1-col));
  //         for(var m = 0; m < noInnerSolutions; m++) { // iterating through inner solutions array
  //         //iterate through no of arrays.length determined by the innerFunction(n-1)
  //         //loop to iterate through remainder of rows and push sub arrays to output
  //            var result = [];
  //            result.push(topRow);
  //            for( var i = 0 ; i < n - 1; i++) {
  //              if(Array.isArray(innerSolutions[m])) {
  //               result.push(innerSolutions[m][i].slice(n-col-1).concat(0).concat(innerSolutions[m][i].slice(col)));
  //              } else {
  //               if(col) {
  //                  result.push(innerSolutions.concat([0]));
  //               } else {
  //                  result.push([0].concat(innerSolutions));
  //               }
  //              }
  //            }
  //            results.push(result);
  //         }
  //     }
  //     return results;
  //   }
  // };

 // console.log(results);
  
  // for(var row = 0; row < n; row++){
  //   for (var col = 0; col < n; col++) {
  //     if(temporary) // if row conflict delete row, if 
  //   }
  // }
  // console.log(innerFunction(n));
  solution = innerFunction(n)[0];

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
 };



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = innerFunction(n).length; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
}; // return a matrix e.g. for n=3 : [[1,0,0], [0,0,1], [0,1,0]] (not a valid solution)


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount; // a number
};
