import instance from './axios'

export function onLogin(data) {
  return instance({
    url: `/api/auth/login`,
    method: 'post',
    data,
  })
}

export function createNote(data: object) {
  return instance({
    url: `/api/notes`,
    method: 'post',
    data,
  })
}
