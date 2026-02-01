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

// 修改資料夾名稱
export function onEditFolder(id: string, data: object) {
  return instance({
    url: `/api/folders/${id}/name`,
    method: 'patch',
    data,
  })
}

// 收藏筆記
// http://localhost:4000/api/notes/c1af33a8-6b7c-4f04-9456-b3654ea929ba/favorite
export function onfavoriteNote(id: string, data: object) {
  return instance({
    url: `/api/notes/${id}/favorite`,
    method: 'patch',
    data,
  })
}
// 釘選筆記
// http://localhost:4000/api/notes/c1af33a8-6b7c-4f04-9456-b3654ea929ba/favorite
export function onPinningNote(id: string, data: object) {
  return instance({
    url: `/api/notes/${id}/pinning`,
    method: 'patch',
    data,
  })
}

// 取得個人會員檔案
// http://localhost:4000/api/user/profile
export function onGetProfile(data: object) {
  return instance({
    url: `/api/user/profile`,
    method: 'get',
    data,
  })
}

// 會員檔案-編輯個人檔案
export function oneditProfile(data: object) {
  return instance({
    url: `/api/user/profile`,
    method: 'post',
    data,
  })
}
// 會員檔案-上傳個人頭像
export function onuploadProfile(data: object) {
  return instance({
    url: `/api/user/avatar`,
    method: 'post',
    data,
  })
}

// 查看自己的筆記
export function onviewerNotes(id: string) {
  return instance({
    url: `/api/notes/${id}`,
    method: 'get',
  })
}
