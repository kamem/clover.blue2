const fs = require('fs')
const path = require('path')
const compareImages = require('resemblejs/compareImages')
const _ = require('lodash')
const mkdirp = require('mkdirp')

const getDiff = async (img1, img2, output = './output.png', options = {}) => {
  const data = await compareImages(
    fs.readFileSync(img1, () => {}),
    fs.readFileSync(img2, () => {}),
    options
  )

  if (data.misMatchPercentage >= 0.01) {
    mkdirp(path.dirname(output), err => {
      if (err) return console.error(err)
      fs.writeFile(output, data.getBuffer(), () => {})
    })
  }
}

const searchDir = dir => {
  return fs
    .readdirSync(dir)
    .filter(item => !fs.existsSync(item))
    .map(item => {
      const filePath = `${dir}/${item}`
      return {
        dir,
        item: fs.statSync(filePath).isDirectory() ? searchDir(filePath) : item
      }
    })
}

const diffPngFiles = dirObj => {
  const pngFiles = getDiffFiles(dirObj)

  if (pngFiles.length === 2) {
    getDiff(
      `${pngFiles[0].dir}/${pngFiles[0].item}`,
      `${pngFiles[1].dir}/${pngFiles[1].item}`,
      `${pngFiles[0].dir.replace('e2e', 'diff')}.png`
    )
  }

  dirObj.forEach(({ dir, item }) => {
    if (Array.isArray(item)) {
      diffPngFiles(item)
    }
  })
}

const getDiffFiles = dirObj => {
  const pngFiles = dirObj.filter(({ item }) => ~item.indexOf('png'))

  return _.sortBy(pngFiles, ({ dir, item }) => {
    return -fs.statSync(`${dir}/${item}`).ctimeMs
  }).slice(0, 2)
}

diffPngFiles(searchDir('./test/e2e/screenshots'))
