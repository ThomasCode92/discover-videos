async function queryHasuraGraphQL(
  token,
  operationsDoc,
  operationName,
  variables
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

export async function isNewUser(token) {
  const operationsDoc = /* GraphQL */ `
    query MyQuery {
      users(
        where: {
          issuer: { _eq: "did:ethr:0x5439788A880048ACE4C9daDAbc3C17E0BF7C0265" }
        }
      ) {
        id
        email
        issuer
      }
    }
  `;

  const response = await queryHasuraGraphQL(
    token,
    operationsDoc,
    'MyQuery',
    {}
  );

  return response.data.users.length === 0;
}

export async function getAllUsers() {
  const operationsDoc = `
    query GetAllData {
      users { id email }
    }
  `;

  const { errors, data } = await queryHasuraGraphQL(
    process.env.NEXT_PUBLIC_HASURA_BEARER_TOKEN,
    operationsDoc,
    'GetAllData',
    {}
  );

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}
