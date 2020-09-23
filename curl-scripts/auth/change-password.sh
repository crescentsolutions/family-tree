#!/bin/bash

API="http://localhost:4741"
# API=" https://stormy-gorge-66260.herokuapp.com"
# can verify deployment url with heroku config command in terminal
URL_PATH="/change-password"

curl "${API}${URL_PATH}/" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

echo
