// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict (if more than 1 item)
    hasRowConflictAt: function(rowIndex) {
      // accessing an array: matrix[row][column]
      //var row = matrix[rowIndex];
      // retrieve n this.attributes.n
      var n = this.attributes.n;
      var row = this.attributes[rowIndex];
      var count = 0;
      for (var colIndex = 0; colIndex < n; colIndex++) {
        if(row[colIndex]) {
          count++;
        }
      }
      //iterate through every colIndex from 0 to n-1 on the given row
        // check if there is a 1 in that
          // if so return true
      return count > 1 ? true: false; // fixme
    }, // returns a boolean // should return undefined if rowIndex larger than n

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //use hasRowConflictAt for every row
      var n = this.attributes.n;
      for (var row = 0; row < n; row++) {
        if(this.hasRowConflictAt(row))
        {
          return true;
        }
      }
      return false; // fixme
    }, //returns a boolean



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) { // takes a number
      var n = this.attributes.n;
      var rows = this.attributes;
      var count = 0;
      for (var rowIndex = 0; rowIndex < n; rowIndex++) {
        if(rows[rowIndex][colIndex]) {
          count++;
        }
      }
      return count > 1 ? true : false; // fixme
    }, // returns a boolan

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = this.attributes.n;
      for (var col = 0; col < n; col++) {
        if(this.hasColConflictAt(col))
        {
          return true;
        }
      }
      return false; // fixme
    }, // returns boolean



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var n = this.attributes.n;
      var matrix = this.attributes;
      var count;
      //there are some branches we are traversing more than once
      //for a given start row, start on first column than iterate diagnoally as far as possible
      //move to next column, iterate diagonally...
      for(var startCol = 0; startCol < n; startCol++) { // outer loop will change the starting col from which we will traverse diagnoally
        count = 0;
        for(var row = majorDiagonalColumnIndexAtFirstRow, col = startCol; col < n && row < n; row++, col++) {
          if(matrix[row][col]) {
            count++;
          }
        }
        if(count > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // call the above function for all the rows
      var n = this.attributes.n;
      for (var startRow = 0; startRow < n; startRow++) {
        if(this.hasMajorDiagonalConflictAt(startRow)){
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var n = this.attributes.n;
      var matrix = this.attributes;
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
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.attributes.n;
      for (var startRow = 0; startRow < n; startRow++) {
        if(this.hasMinorDiagonalConflictAt(startRow)){
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

