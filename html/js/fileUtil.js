/**
 * 获取文件的后缀
 *
 * @export
 * @param {*} fileName
 */
export function getFileExt (fileName) {
  const index = fileName.lastIndexOf('.')
  return fileName.substring(index)
}

/**
 * 判断文件大小是否超过 大小
 *
 * @export
 * @param {*} file 文件
 * @param {*} size 参考值 K
 */
export function isFileSizeGreaterThan (file, size) {
  const referenceSize = size * 1024
  const fileSize = file.size
  return fileSize - referenceSize > 0
}

export const excelTypes = ['.xls', '.xlsx']

export function getAcceptExcelType () {
  return excelTypes.join(',')
}

export const imageFileTypes = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.bmp'
]

export function getAcceptImageType () {
  return imageFileTypes.join(',')
}

export function getBlobUrl (file) {
  if (file.fromServer) {
    return process.env.VUE_APP_FILE_URL_PRE + file.uploadFilePath
  }
  return window.URL.createObjectURL(file.file)
}

export function exportExcel (req) {
  // req 的 responseType 需要设置成 blob
  req.then(
    res => {
      const blob = res
      const reader = new FileReader()
      reader.readAsDataURL(blob) // 转换为base64，可以直接放入a标签href
      reader.onload = function (e) {
        const link = document.createElement('a') // 转换完成，创建一个a标签用于下载
        const fileName = decodeURIComponent('投资计划' + '.xlsx')

        link.style.display = 'none'
        link.href = e.target.result
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.remove(link)
        location.reload()
      }
    }
  )
}
