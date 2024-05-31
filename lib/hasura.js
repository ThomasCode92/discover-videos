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

export async function createNewUser(token, metadata) {
  const operationsDoc = /* GraphQL */ `
    mutation CreateNewUser(
      $issuer: String!
      $email: String!
      $publicAddress: String!
    ) {
      insert_users(
        objects: {
          email: $email
          issuer: $issuer
          public_address: $publicAddress
        }
      ) {
        returning {
          email
          id
          issuer
        }
      }
    }
  `;

  const { issuer, email, publicAddress } = metadata;
  const variables = { issuer, email, publicAddress };

  await queryHasuraGraphQL(token, operationsDoc, 'CreateNewUser', variables);
}

export async function findStatsByUserAndVideoId(token, userId, videoId) {
  const operationsDoc = /* GraphQL */ `
    query FindStatsByUserId($userId: String!, $videoId: String!) {
      stats(where: { user_id: { _eq: $userId }, video_id: { _eq: $videoId } }) {
        id
        watched
        favoured
      }
    }
  `;

  const variables = { userId, videoId };
  const response = await queryHasuraGraphQL(
    token,
    operationsDoc,
    'FindStatsByUserId',
    variables
  );

  return response.data.stats[0];
}
