const fs = require('fs');

module.exports = unlink = (url) => {
  if (url && url != 'null') {
    fs.unlinkSync(`public${url}`)
  }
}