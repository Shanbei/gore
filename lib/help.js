const { padEnd, padStart } = require('lodash');
const { echo } = require('shelljs');

module.exports = () => {
  let helpText = [
    ['custom command and parameter', 'Open the link with your command and replace the parameters in it'],
    ['--save, -s', 'Save your commands and links'],
    ['--remove, -r', 'Remove your commands and links'],
    ['--list, -l', 'Show your commands and links'],
    ['--version, -v', 'Displays the current goldenretriever version'],
    ['--catch', 'clear cache'],
  ];
  const blank = ' ';
  const middle = helpText.map(([t1, t2]) => `${padStart('', 2, blank)}${padEnd(t1, 40, blank)}${t2}`).join('\n');
  echo(`help list: \n ${middle}`);
};
