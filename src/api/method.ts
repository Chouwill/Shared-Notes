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
export function onGetProfile() {
  return instance({
    url: `/api/user/profile`,
    method: 'get',
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

// 作者查看自己的筆記
export function onviewerNotes(id: string) {
  return instance({
    url: `/api/notes/${id}`,
    method: 'get',
  })
}
// https://shared-notes-api.onrender.com/api/notes/e6605f62-c85c-4d72-84ec-d9f36956c259
// 作者修改筆記
export function onEditNote(id: string, data: any) {
  return instance({
    url: `/api/notes/${id}`,
    method: 'patch',
    data,
  })
}

// 查看公開的筆記
export function onvisiteNotes(id: string) {
  return instance({
    url: `/api/notes/public/${id}`,
    method: 'get',
  })
}

//作者刪除筆記
// https://shared-notes-api.onrender.com/api/notes/88405c91-a37f-4af5-bbd7-4cfbee07d5ec
export function onDeleteNote(id: string) {
  return instance({
    url: `/api/notes/${id}`,
    method: 'delete',
  })
}
