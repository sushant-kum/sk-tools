const { exec } = require('child_process');

if (process.env.NODE_ENV !== 'production') {
  const child = exec('node decorate-angular-cli.js');

  child.on('error', (err) => {
    throw err;
  });
  child.stdout.on('data', (data) => {
    console.log(data);
  });
  child.on('exit', function (code, signal) {
    if (code !== 0) {
      console.error(`Signal: ${signal}`);
    }
  });
}
