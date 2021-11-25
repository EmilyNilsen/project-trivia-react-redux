const getToken = localStorage.getItem('token');
const URL = `https://opentdb.com/api.php?amount=5&token=${getToken}`;

export default async function getQuestion() {
  const response = await fetch(URL);
  const JSON = await response.json();
  const question = JSON.results;
  return question;
}
