const { echo } = require('shelljs');
module.exports = () => {
  const path = __dirname.split('/')
  path.pop()
  echo(`${path.join('/')}`)
};
