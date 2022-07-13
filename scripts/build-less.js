const fs = require('fs-extra')
const path = require('path')


const readFiles = async (filePath, name, callback) => {
  const files = fs.readdirSync(filePath)
  files.forEach(file => {
    const filedir = path.join(filePath, file)
    fs.stat(filedir, (error, stats) => {
      if (error) {
        return console.error('stats error:', error)
      }
      if (stats.isFile() && filedir.indexOf(name) > -1) {
        callback && callback(filedir)
      } else if (stats.isDirectory()) {
        readFiles(filedir, name, callback)
      }
    })
  })
}


const componentsPath = 'src'
readFiles(path.join(__dirname, `../${componentsPath}`), '.less',
  (file, error) => {
    if (error) {
      return console.error('read files error:', error)
    }
    fs.outputFileSync(
      file.replace(componentsPath, 'lib'),
      fs.readFileSync(file)
    )
  }
)
