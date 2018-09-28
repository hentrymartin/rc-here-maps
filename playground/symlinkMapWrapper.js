var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var os = require('os');

symlink = {};

// Start
symlink.init = function() {
  var destinationDir = __dirname,
    srcFolder = destinationDir.slice(0, destinationDir.lastIndexOf(path.sep));

  // Mount the src to lib folder
  this.mount(srcFolder, srcFolder + '/playground/node_modules/rc-here-maps');
};

// Mounts the from directory to the to directory
symlink.mount = function(fromPath, toPath) {
  try {
    var cmd;

    if (os.platform() != 'win32') {
      var command = os.platform() == 'darwin' ? 'bindfs ' : 'sudo mount --bind ';

      fs.existsSync(toPath) || this.mkpath(toPath);
      cmd = child_process.execSync(command + fromPath + ' ' + toPath);
    } else if (!fs.existsSync(toPath)) {
      cmd = child_process.execSync('junction.exe ' + toPath + ' ' + fromPath);
    }

    console.log('Mounting done for: ' + fromPath + ' was successfully done' + 'to: ' + toPath);
  } catch (err) {
    console.log(process.stdout.write(cmd));
    console.log(err.stack);
  }
};

// Makes new folder based on the OS types
symlink.mkpath = function(path) {
  try {
    var command = os.platform() == 'win32' ? 'md ' : 'mkdir -p ';
    child_process.execSync(command + path);
  } catch (error) {
    console.log(error.stack);
  }
};

symlink.init();
