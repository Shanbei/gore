const yargs = require('yargs');
const { echo } = require('shelljs');
const aliasList = {
  save: 's',
  remove: 'r',
  list: 'l',
  version: 'v',
};
function verify(val, bool) {
  if (!val) {
    return false;
  }
  if (!bool) {
    return true;
  }
  return typeof val === 'string';
}
module.exports = async () => {
  Object.keys(aliasList).forEach(key => {
    yargs.alias(key, aliasList[key]);
  });
  const { argv } = yargs;
  switch (true) {
    case verify(argv.save, true):
      const addPath = require('./addPath');
      addPath(argv.save);
      break;
    case verify(argv.remove):
      const setRemove = require('./setRemove');
      setRemove([argv.remove, ...argv._]);
      break;
    case verify(argv.list):
      const viewMap = require('./getMap');
      viewMap([argv.list, ...argv._]);
      break;
    case verify(argv.catch):
      const { catchNedbAll } = require('./tool');
      const total = await catchNedbAll();
      echo(`clean up: ${total}`);
      break;
    case verify(argv.version):
      const getVersion = require('./getVersion');
      echo(getVersion());
      break;
    case argv.pwd:
      require('./pwd')();
      break;
    case argv._.length === 0:
      require('./help')();
      break;
    default:
      const openPath = require('./openPath');
      openPath();
  }
};
