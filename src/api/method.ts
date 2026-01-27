import instance from './axios'

export function onLogin(data) {
  return instance({
    url: `/api/auth/login`,
    method: 'post',
    data,
  })
}

export function onRegister(data) {
  return instance({
    url: `/api/auth/register`,
    method: 'post',
    data,
  })
}

export function onCreateNote(data: object) {
  return instance({
    url: `/api/notes`,
    method: 'post',
    data,
  })
}

// http://localhost:4000/api/notes/images

// 筆記編輯區上傳圖片
export function onuploadImage(data) {
  return instance({
    url: `/api/notes/images`,
    method: 'post',
    data,
  })
}

// 創建資料夾
export function onCreateFolder(data) {
  return instance({
    url: `/api/folders`,
    method: 'post',
    data,
  })
}

// 取得個人工作站所有資料夾、筆記
export function getAllFolder() {
  return instance({
    url: `/api/folders`,
    method: 'get',
  })
}
