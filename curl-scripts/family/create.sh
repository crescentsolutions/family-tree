API="http://localhost:4741"
URL_PATH="/family-members"

curl "${API}${URL_PATH}" \
--include \
--request POST \
--header "Authorization: Bearer ${TOKEN}" \
  --header "Content-type: application/json" \
  --data '{
    "familyMember": {
      "firstName": "'"${FIRST_NAME}"'",
      "relationship":  "'"${RELATIONSHIP}"'",
      "generation":  "'"${GENERATION}"'",
      "familyTree":  "'"${FAMILY_TREE}"'",
      "owner":  "'"${OWNER}"'"
    }
  }'
echo
