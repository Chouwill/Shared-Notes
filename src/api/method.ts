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
