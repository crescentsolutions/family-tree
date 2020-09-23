#!/bin/bash

API="http://localhost:4741"
# API=" https://stormy-gorge-66260.herokuapp.com"
# can verify deployment url with heroku config command in terminal
URL_PATH="/sign-up"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
