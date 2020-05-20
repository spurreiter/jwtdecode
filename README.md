# jwtdecode

CLI to decode JWT token payloads

Do not use to verify tokens.

## Install

```bash
npm i -g https://github.com/spurreiter/jwtdecode
```

## Usage

decode from string
```
jwtdecode <token>
```

pipe from file
```
cat test/token.txt | jwtdecode
```

pipe from curl
```
curl -v \
  -d "grant_type=password" \
  -d "username=$username" \
  -d "password=$password" \
  -d "client_id=$client_id" \
  http://localhost:8080/auth/realms/$realm/protocol/openid-connect/token | jwtdecode
```

## License

MIT Licensed
