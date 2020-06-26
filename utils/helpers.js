const _ = require('lodash');

// Test helper as placeholder
module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
    
        return word;
    },
    // Removes Diacritical marks from names
    format_deburr: word => {
        return _.deburr(word)
    },
    // Run API through to test if it is empty (finish function)
    format_isEmpty: (obj) => {
        if _.isEmpty(obj) {
            return err
        }
    }
  }