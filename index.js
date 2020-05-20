
const toTime = (obj, field) => {
  if (obj[field]) obj[field] = new Date(obj[field] * 1000)
}

const base64dec = str => Buffer.from(str, 'base64').toString()

const parse = (str) => JSON.parse(base64dec(str))

async function decodeToken (token) {
  const [header, payload/*, signature*/] = token
    .replace('/-/g', '+').replace('/_/g', '/').split('.')
  const _payload = payload || header

  const headerParsed = _payload !== header ? parse(header) : null
  const payloadParsed = parse(_payload)

  if (typeof payloadParsed === 'object') {
    toTime(payloadParsed, 'exp')
    toTime(payloadParsed, 'iat')
    toTime(payloadParsed, 'auth_time')
  }

  return {
    header: headerParsed,
    payload: payloadParsed
  }
}

module.exports = decodeToken
