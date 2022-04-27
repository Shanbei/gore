module.exports = () => {
  const package = require('./../package.json');
  return package?.version || 'Failed to get version';
};
