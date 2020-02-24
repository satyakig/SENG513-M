const cp = require('shelljs').cp;

cp('package.json', 'build/');
cp('package-lock.json', 'build/');
cp('app.yaml', 'build/');
cp('-R', 'node_modules/', 'build/');
