#!/bin/bash

curl "http://localhost:4741/family-members" \
--include \
--request POST \
  --header "Content-type: application/json" \
  --data '{
    "familyMember": {
      "firstName": "'"${FIRST_NAME}"'",
      "relationship":  "'"${RELATIONSHIP}"'",
      "generation":  "'"${GENERATION}"'",
      "familyTree":  "'"${FAMILY_TREE}"'"
    }
  }'
echo
