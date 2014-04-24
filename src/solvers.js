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

var hasAnyMinorDiagonalConflicts = function(matrix, n) {
     // var n = this.attributes.n;
      for (var startRow = 0; startRow < n; startRow++) {
        if(hasMinorDiagonalConflictAt(matrix, startRow, n)){
          return true;
        }
      }
      return false; // fixme
};

var hasAnyMajorDiagonalConflicts = function(matrix, n) {
      // call the above function for all the rows
      for (var startRow = 0; startRow < n; startRow++) {
        if(hasMajorDiagonalConflictAt(matrix, startRow, n)){
          return true;
        }
      }
      return false; // fixme
};

var hasMinorDiagonalConflictAt = function(matrix, minorDiagonalColumnIndexAtFirstRow, n) {
    //  var matrix = this;
      var count;
      for(var startCol = n - 1; startCol >= 0; startCol--) { // outer loop will change the starting col from which we will traverse diagnoally
        count = 0;
        for(var row = minorDiagonalColumnIndexAtFirstRow, col = startCol; row < n && col >= 0; row++, col--) {
          if(matrix[row][col]) {
            count++;
          }
        }
        if(count > 1) {
          return true;
        }
      }
      return false; // fixme
};

var hasMajorDiagonalConflictAt = function(matrix, majorDiagonalColumnIndexAtFirstRow, n) {
      //var matrix = this;
      var count;
      //there are some branches we are traversing more than once
      //for a given start row, start on first column than iterate diagnoally as far as possible
      //move to next column, iterate diagonally...
      for(var startCol = 0; startCol < n; startCol++) { // outer loop will change the starting col from which we will traverse diagnoally
        count = 0;
        for(var row = majorDiagonalColumnIndexAtFirstRow, col = startCol; col < n && row < n && row >= 0; row++, col++) {
         // console.log(row);
          if(matrix[row][col]) {
            count++;
          }
        }
        if(count > 1) {
          return true;
        }
      }
      return false; // fixme
};

var innerFunction = function(n) { // generates all array combinations
  // For each rook in each column of the top row of the to be constructed n * n matrix
  //  iterate through the no of solutions in the n-th call of the function (since there are this many arrays possible for each rook position in the first row)
  //      iterate through the no of rows and construct the remainder of the matrix pushing to an output

  //      return a solution to the output
    var results = [];
    if (n === 1 || n === 0) {
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
                // console.log('inner solution[m][i] m i:' + innerSolutions[m][i] + ' ' + m + ' ' + i );
                // console.log('col is: ' + col + ' n is: ' + n);
                // this next code inserts a 0 at the column at which we have inserted a rook at the top row, 
                //the position of the zero will be at the end (last column) when col is at the end, so concat zero to end in that case
                // if(col < n-1) { 
                //   result.push(innerSolutions[m][i].slice(n-col-2, col).concat(0).concat(innerSolutions[m][i].slice(col)));
                // } else { // if zero at end column
                //    result.push(innerSolutions[m][i].slice(n-col-1, col).concat(0));
                // }
                if (col === 0) {
                  result.push([0].concat(innerSolutions[m][i].slice(0)));
                } else if( col === n-1) {
                  result.push(innerSolutions[m][i].slice(0, col).concat(0));
                } else {
                  result.push(innerSolutions[m][i].slice(0, col).concat(0).concat(innerSolutions[m][i].slice(col, n)));
                }
               } else {
                if(col) {
                   result.push(innerSolutions.concat([0]));
                } else {
                   result.push([0].concat(innerSolutions));
                }
               }
             }
             // console.log('result is: ');
             // console.log(result);
             results.push(result);
          }
      }
      return results;
    }
};

window.findNRooksSolution = function(n) {
  var solution = innerFunction(n);
  if(Array.isArray(solution)) {
    solution = solution[0];
  } else {
    var arr = [];
    arr.push(solution);
  }
  
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return [solution];
};
//it is possible to use the n-rooks solution immediately, otherwise copy n-rooks
// and check for diagonals using a n-rooks from a base case of 4


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = innerFunction(n).length; //fixme

 // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensChessboards = function(n) {
  var rookBoards = innerFunction(n);
  //check if has any major or minor diagonal conflicts
  var resultArray = [];//
  if(rookBoards.length > 1) {
    for(var board = 0; board < rookBoards.length; board++) {
      //console.log(rookBoards[board]);
      if(!hasAnyMajorDiagonalConflicts(rookBoards[board], n) && !hasAnyMinorDiagonalConflicts(rookBoards[board],n)) {
        resultArray.push(rookBoards[board]);
      }
    }
  } //else {} // need to deal with time when rookBoards
  // if neither push to results
  return resultArray;

  // if either both, investigate where, and remove, then add, if possible

};  


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = window.findNQueensChessboards(n);
 // console.log('solution: ' + solution + ' for n = ' + n);
  if(solution.length) {
    solution = solution[0];
  }
  if (n === 0 || n === 1) {
    solution = [1];
  } 

  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
}; // return a matrix e.g. for n=3 : [[1,0,0], [0,0,1], [0,1,0]] (not a valid solution)


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = window.findNQueensChessboards(n).length; //fixme
  if (n === 0 || n===1) {
    solutionCount = 1;
  } 
 
 // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount; // a number
};
