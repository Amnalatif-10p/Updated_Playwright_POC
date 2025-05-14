const fs = require('fs');
const path = require('path');

function logError(testName, error) {
  const logDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  const logFile = path.join(logDir, `${testName.replace(/\s+/g, '_')}.log`);
  fs.writeFileSync(logFile, error.stack || error.toString());
}

module.exports = { logError };
