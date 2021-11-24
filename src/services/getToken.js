const ENDPOINT_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const getToken = () => fetch(ENDPOINT_TOKEN)
  .then((response) => response.json()
    .then((json) => json.token));

export default getToken;
