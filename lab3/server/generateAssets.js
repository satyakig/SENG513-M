const cp = require('shelljs').cp;

cp('package.json', 'build/');
cp('app.yaml', 'build/');
