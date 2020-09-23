#!/bin/bash

API="http://localhost:4741"
# API=" https://stormy-gorge-66260.herokuapp.com"
# can verify deployment url with heroku config command in terminal
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
