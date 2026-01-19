import instance from './axios'

export function createNote(data: object) {
  return instance({
    url: `/api/notes`,
    method: 'post',
    data,
  })
}
