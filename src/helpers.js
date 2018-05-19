const multer = require('multer')

const getPostData = () => {
  return multer({dest: '/tmp/'})
}

module.exports = {
  getPostData,
}