export default async function getQuestion(token) {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;

  const response = await fetch(URL);
  const JSON = await response.json();
  const questions = JSON.results;
  return questions;
}
