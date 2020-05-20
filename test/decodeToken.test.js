const assert = require('assert')
const decodeToken = require('..')
const fs = require('fs')

describe('decodeToken', function() {
  it('shall decode token', async function() {
    const token = fs.readFileSync(`${__dirname}/token.txt`, 'utf8')

    const r = await decodeToken(token)

    assert.deepStrictEqual(r, {
      header: {
        alg: 'RS256',
        typ: 'JWT',
        kid: 'RXL1vRbp_NvR7oQp1li5vEG7tYqEANbBU2GDpFdORak'
      },
      payload: {
        jti: 'b6a7ee1d-448d-45d8-9f0e-6cf3ba34de83',
        exp: new Date('2020-05-20T17:45:02.000Z'),
        nbf: 0,
        iat: new Date('2020-05-20T17:40:02.000Z'),
        iss: 'http://localhost:8080/auth/realms/foo',
        aud: 'account',
        sub: 'e2d446cc-7a0e-41aa-abb6-9f23c25b9d32',
        typ: 'Bearer',
        azp: 'foo',
        auth_time: 0,
        session_state: '3a25668d-b5c3-450c-8092-0bfff6219106',
        acr: '1',
        'allowed-origins': ['http://localhost:4000'],
        realm_access: {
          roles: ["offline_access",
            "uma_authorization"
          ]
        },
        resource_access: {
          account: {
            "roles": [
              "manage-account",
              "manage-account-links",
              "view-profile"
            ]
          }
        },
        scope: 'openid profile email',
        email_verified: false,
        name: 'Foo Bar',
        preferred_username: 'foo',
        given_name: 'Foo',
        family_name: 'Bar',
        email: 'foo@bar.com'
      }
    })
  })
})
