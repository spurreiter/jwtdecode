#!/usr/bin/env bash

realm=foo
client_id=foo
username=foo
password=foobar

function directgrant () {
  curl -v \
    -d "grant_type=password" \
    -d "username=$username" \
    -d "password=$password" \
    -d "client_id=$client_id" \
    -d "scope=openid" \
    http://localhost:8080/auth/realms/$realm/protocol/openid-connect/token
}

function refresh () {
  refresh_token=$1
  curl -v \
    -d "grant_type=refresh_token" \
    -d "client_id=$client_id" \
    -d "refresh_token=$refresh_token" \
    http://localhost:8080/auth/realms/$realm/protocol/openid-connect/token
}

case $1 in
  refresh)
    refresh $2
    ;;
  *)
    directgrant
    ;;
esac

echo
echo
