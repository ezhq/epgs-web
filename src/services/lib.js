// import axios from 'axios'

// const baseUrl = 'http://localhost:8095/lib'
import apiTrans from 'app/plugin/apiTrans'

export function getListAll() {
  return apiTrans({
    url: '/lib/list/all',
    method: 'get'
  })
}

export function addBook(inData) {
  return apiTrans({
    url: `/lib/book/add`,
    method: `post`,
    data: inData
  })
}

export function  getRecordById(id) {
  return apiTrans({
    url: `/lib/book/record/${id}`,
    method: `get`
  })
}

export function addBookReadRecord(inData) {
  return apiTrans({
    url: `/lib/book/record/add`,
    method: `post`,
    data: inData
  })
}
