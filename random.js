
const random = module.exports;

random.list_digit = function (number, option) {
  var res = [];
  var min = option.min || 0;
  var max = option.max;
  for (var i = 0; i < number; i++) {
    res.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return res;
};
// console.log(exports.list_digit(2, { max: 110 }));


// option { max , min }
// return 17
random.digit = function (option) {
  return random.list_digit(1, option)[0];
};


random.str = function(len) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var possible_length = possible.length;
  for (var i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible_length));
  }
  return text;
};