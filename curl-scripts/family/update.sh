API="http://localhost:4741"
URL_PATH="/family-members"

curl "${API}${URL_PATH}/${ID}" \
--include \
--request PATCH \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "familyMember": {
    "firstName": "'"${FIRST_NAME}"'",
    "relationship":  "'"${RELATIONSHIP}"'",
    "generation":  "'"${GENERATION}"'",
    "familyTree":  "'"${FAMILY_TREE}"'"
  }
}'

echo
