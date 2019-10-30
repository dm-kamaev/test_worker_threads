// Если вы пользуетесь Node.js младше версии 11.7.0, воспользуйтесь
// для запуска этого кода командой
// node --experimental-worker main_many_threads.js
const worker_threads = require('worker_threads');
const fs = require('fs');


function start(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new worker_threads.Worker('./worker.js', { workerData });
    worker.on('message', ({ data }) => {
      resolve(data);
    });
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

async function main() {
  try {
    console.time('Start');
    // NEED require('os').cpus().length === 4
    const results = await Promise.all([ start(25000), start(25000), start(25000), start(25000) ]);
    console.log(results);
    console.timeEnd('Start');
    let result = [];
    results.forEach(arr => result = result.concat(arr));
    fs.writeFileSync('./res.log', result, 'utf-8');
  } catch (err) {
    console.error(err);
  }
}

main();


