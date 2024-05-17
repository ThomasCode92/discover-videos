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

export async function getUserByDid(token, issuer) {
  const operationsDoc = /* GraphQL */ `
    query GetUserByIssuer($issuer: String!) {
      users(where: { issuer: { _eq: $issuer } }) {
        id
        email
        issuer
      }
    }
  `;

  const variables = { issuer };
  const response = await queryHasuraGraphQL(
    token,
    operationsDoc,
    'GetUserByIssuer',
    variables
  );

  return response.data.users[0];
}
