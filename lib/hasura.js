async function queryHasuraGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HASURA_BEARER_TOKEN}`,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

export async function getAllUsers() {
  const operationsDoc = `
    query GetAllData {
      users { id email }
    }
  `;

  const { errors, data } = await queryHasuraGraphQL(
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
