
// 文件下载 重命名文件
export function download (url, filename) {
  getBlob(url, function (blob, name) {
    saveAs(blob, filename || name)
  })
}

export function getBlob (url, cb) {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', url, true)

  xhr.responseType = 'blob'

  xhr.onload = function () {
    if (xhr.status === 200) {
      // 读取文件名
      let filename = ''
      const disposition = xhr.getResponseHeader('content-disposition') || ''
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const matches = filenameRegex.exec(disposition)
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '').replace(/%/g, '%25')
        filename = decodeURIComponent(filename)
      }
      cb(xhr.response, filename)
    }
  }

  xhr.send()
}

export function saveAs (blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')

    const body = document.querySelector('body')

    link.href = window.URL.createObjectURL(blob)

    link.download = filename

    // fix Firefox

    link.style.display = 'none'

    body.appendChild(link)

    link.click()

    body.removeChild(link)

    window.URL.revokeObjectURL(link.href)
  }
}