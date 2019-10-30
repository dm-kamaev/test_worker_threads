
const crypto = require('crypto');
const fs = require('fs');
const random = require('./random.js');

async function main() {
  try {
    console.time('Start');
    var res = [];
    for (var i = 0; i < 100000; i++) {
      res.push(get_key());
    }
    console.timeEnd('Start');
    fs.writeFileSync('./res.log', res, 'utf-8');
    console.log('Res=', res);
  } catch (err) {
    console.error(err);
  }
}


function get_key() {
  return crypto.createHash('sha512')
    .update(random.str(100))
    .update(random.str(200))
    .update(random.str(300))
    .update(Date.now()+random.str(10000))
    .digest('hex');
}

main();