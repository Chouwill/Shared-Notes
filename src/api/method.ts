import instance from './axios'

export function onLogin(data) {
  return instance({
    url: `/api/shared-notes/auth/login`,
    method: 'post',
    data,
  })
}

export function onRegister(data) {
  return instance({
    url: `/api/shared-notes/auth/register`,
    method: 'post',
    data,
  })
}

export function onCreateNote(data: object) {
  return instance({
    url: `/api/shared-notes/notes`,
    method: 'post',
    data,
  })
}

export function onuploadImage(data) {
  return instance({
    url: `/api/shared-notes/notes/images`,
    method: 'post',
    data,
  })
}

export function onCreateFolder(data) {
  return instance({
    url: `/api/shared-notes/folders`,
    method: 'post',
    data,
  })
}

export function getAllFolder() {
  return instance({
    url: `/api/shared-notes/folders`,
    method: 'get',
  })
}

export function getAllNotes() {
  return instance({
    url: `/api/shared-notes/notes`,
    method: 'get',
  })
}

export function onEditFolder(id: string, data: object) {
  return instance({
    url: `/api/shared-notes/folders/${id}/name`,
    method: 'patch',
    data,
  })
}

export function onfavoriteNote(id: string, data: object) {
  return instance({
    url: `/api/shared-notes/notes/${id}/favorite`,
    method: 'patch',
    data,
  })
}

export function onPinningNote(id: string, data: object) {
  return instance({
    url: `/api/shared-notes/notes/${id}/pinning`,
    method: 'patch',
    data,
  })
}

export function onGetProfile() {
  return instance({
    url: `/api/shared-notes/user/profile`,
    method: 'get',
  })
}

export function oneditProfile(data: object) {
  return instance({
    url: `/api/shared-notes/user/profile`,
    method: 'post',
    data,
  })
}

export function onuploadProfile(data: object) {
  return instance({
    url: `/api/shared-notes/user/avatar`,
    method: 'post',
    data,
  })
}

export function onviewerNotes(id: string) {
  return instance({
    url: `/api/shared-notes/notes/${id}`,
    method: 'get',
  })
}

export function onEditNote(id: string, data: any) {
  return instance({
    url: `/api/shared-notes/notes/${id}`,
    method: 'patch',
    data,
  })
}

export function onvisiteNotes(id: string) {
  return instance({
    url: `/api/shared-notes/notes/public/${id}`,
    method: 'get',
  })
}

export function onDeleteNote(id: string) {
  return instance({
    url: `/api/shared-notes/notes/${id}`,
    method: 'delete',
  })
}

export function onGetPublicNote() {
  return instance({
    url: `/api/shared-notes/notes/admin/public`,
    method: 'get',
  })
}

export function onReviewNote(id: string, data) {
  return instance({
    url: `/api/shared-notes/admin/notes/${id}/review`,
    method: 'patch',
    data,
  })
}

export function onReadNotes() {
  return instance({
    url: `/api/shared-notes/notes/public/approved`,
    method: 'get',
  })
}

export function onMemberNoteView(id: string) {
  return instance({
    url: `/api/shared-notes/notes/public/${id}/view`,
    method: 'get',
  })
}
