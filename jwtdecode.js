#!/usr/bin/env node

const { inspect } = require('util')
const decodeToken = require('./index.js')

function log (obj) {
  console.log(inspect(obj, { depth: null }))
}

async function decode (token) {
  try {
    if (/[{]/.test(token)) {
      const obj = JSON.parse(token)
      if (obj.refresh_token) log(await decodeToken(obj.refresh_token))
      if (obj.access_token) log(await decodeToken(obj.access_token))
    } else {
      log(await decodeToken(token))
    }
  } catch (err) {
    console.error(err.message)
  }
}

function readStdin (cb) {
  const { stdin } = process
  let buf = ''
  stdin.setEncoding('utf8')
  stdin.on('data', data => buf += data)
  stdin.on('error', err => cb(err, []))
  stdin.on('end', () => cb(null, [buf]))
}

function main () {
  const argv = process.argv.slice(2)

  const cb = async (err, data) => {
    while (data.length) {
      let token = data.pop()
      await decode(token)
    }
  }
  if (!argv.length) {
    readStdin(cb)
  } else {
    cb(null, argv)
  }
}

main()
