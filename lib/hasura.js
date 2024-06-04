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

//#region Users
export async function findUserByDid(token, issuer) {
  const operationsDoc = /* GraphQL */ `
    query GetUserByIssuer($issuer: String!) {
      users(where: { issuer: { _eq: $issuer } }) {
        id
        email
        issuer
      }
    }
  `;

  const response = await queryHasuraGraphQL(
    token,
    operationsDoc,
    'GetUserByIssuer',
    { issuer }
  );

  if (response.errors) throw new Error(response.errors[0].message);

  const user = response.data.users[0];

  if (!user) return null;

  return user;
}

export async function createNewUser(token, data) {
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

  await queryHasuraGraphQL(token, operationsDoc, 'CreateNewUser', data);
}
//#endregion

//#region Stats
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

  if (response.errors) throw new Error(response.errors[0].message);

  const stats = response.data.stats[0];

  if (!stats) return null;

  return stats;
}

export async function addStatsForUserAndVideoId(token, userId, videoId, data) {
  const operationsDoc = /* GraphQL */ `
    mutation AddStatsForUserId(
      $userId: String!
      $videoId: String!
      $favoured: Boolean!
      $watched: Boolean!
    ) {
      insert_stats_one(
        object: {
          user_id: $userId
          video_id: $videoId
          favoured: $favoured
          watched: $watched
        }
      ) {
        id
        user_id
        video_id
        watched
        favoured
      }
    }
  `;

  const response = await queryHasuraGraphQL(
    token,
    operationsDoc,
    'AddStatsForUserId',
    { userId, videoId, ...data }
  );

  if (response.errors) throw new Error(response.errors[0].message);

  return response.data.insert_stats_one;
}

export async function updateStatsForUserAndVideoId(
  token,
  userId,
  videoId,
  data
) {
  const operationsDoc = /* GraphQL */ `
    mutation UpdateStatsForUserId(
      $userId: String!
      $videoId: String!
      $favoured: Boolean!
      $watched: Boolean!
    ) {
      update_stats(
        _set: { watched: $watched, favoured: $favoured }
        where: { user_id: { _eq: $userId }, video_id: { _eq: $videoId } }
      ) {
        returning {
          id
          user_id
          video_id
          watched
          favoured
        }
      }
    }
  `;

  const response = await queryHasuraGraphQL(
    token,
    operationsDoc,
    'UpdateStatsForUserId',
    { userId, videoId, ...data }
  );

  if (response.errors) throw new Error(response.errors[0].message);

  return response.data.update_stats.returning[0];
}
//#endregion
