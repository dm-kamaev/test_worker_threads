// Тут, асинхронно, не блокируя главный поток,
// можно выполнять тяжёлые вычисления.

const { workerData, parentPort } = require('worker_threads');

const crypto = require('crypto');
const random = require('./random.js');

async function main() {
  try {
    var res = [];
    let len = parseInt(workerData, 10);
    for (var i = 0; i < len; i++) {
      res.push(get_key());
    }
    parentPort.postMessage({ data: res });
  } catch (err) {
    console.error(err);
  }
}
main();

function get_key() {
  return crypto.createHash('sha512')
    .update(random.str(100))
    .update(random.str(200))
    .update(random.str(300))
    .update(Date.now()+random.str(10000))
    .digest('hex');
}