import { readFile, readFileSync, writeFile, writeFileSync } from 'fs'
import { cleanItems } from './helper'

const getUsers = () =>
  new Promise((resolve, reject) => {
    try {
      readFile('database/users.json', 'utf8', (error, data) =>
        resolve(JSON.parse(data)),
      )
    } catch (error) {
      reject('db getUsers', error)
    }
  })

export const getUser = (callback) =>
  new Promise(async (resolve, reject) => {
    try {
      const users = await getUsers()
      const user = users.find(callback)

      user ? resolve(user) : resolve(null)
    } catch (error) {
      reject('db getUser', error)
    }
  })

export const setUser = (ip, name) =>
  new Promise(async (resolve, reject) => {
    try {
      const users = await getUsers()
      const user = {
        id: users.length,
        name,
        ip,
        balance: 1000,
        betsHistory: [],
      }

      writeFile(
        'database/users.json',
        JSON.stringify([...users, user]),
        resolve,
      )
    } catch (error) {
      reject('db setUser', error)
    }
  })

export const updateUser = (id, params) =>
  new Promise(async (resolve, reject) => {
    try {
      const users = await getUsers()
      const newUsers = users.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            ...params,
            id,
          }
        }
        return u
      })

      writeFile('database/users.json', JSON.stringify(newUsers), () => {
        resolve(newUsers.find(({ id }) => id === id))
      })
    } catch (error) {
      reject('db updateUser', error)
    }
  })

export const getBets = () =>
  new Promise((resolve, reject) => {
    try {
      readFile('database/bets.json', 'utf8', (error, data) =>
        resolve(JSON.parse(data)),
      )
    } catch (error) {
      reject('db getBets', error)
    }
  })

export const addBets = (color) =>
  new Promise(async (resolve, reject) => {
    try {
      let bets = await getBets()

      if (bets.length > 25) {
        bets = cleanItems(bets)
      }
      writeFile('database/bets.json', JSON.stringify([...bets, color]), resolve)
    } catch (error) {
      reject('db addBets', error)
    }
  })

export const getMessages = () =>
  new Promise((resolve, reject) => {
    try {
      readFile('database/messages.json', 'utf8', (error, data) =>
        resolve(JSON.parse(data)),
      )
    } catch (error) {
      reject('db getMessages', error)
    }
  })

export const addMessage = (message) =>
  new Promise(async (resolve, reject) => {
    try {
      const messages = await getMessages()

      writeFile(
        'database/messages.json',
        JSON.stringify([...messages, message]),
        resolve,
      )
    } catch (error) {
      reject('db addMessage', error)
    }
  })
