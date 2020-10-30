/*
  Returns an object of only the specific column entered.
*/
module.exports.getColumn = function(data, column) {
  return data.map(item => item[column]);
}

/*
  Returns a list of object of the columns entered, receiving multiple columns as strings in a list.
*/
module.exports.getColumns = function(data, columns) {
  return data.map(item => {
    result = {};
    for (column of columns) {
      result[column] = item[column];
    }
    return result;
  })
}

/*
  Returns every key in the data as a list
*/
module.exports.getKeys = function(data) {
  result = [];
  keys = data.map(item => Object.keys(item));
  keys.forEach((item) => {
    item.forEach((key) => {
      if (!result.includes(key)) {
        result.push(key);
      }
    });
  });
  return result;
}
