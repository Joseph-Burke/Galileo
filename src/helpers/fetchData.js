
const fetchData = async () => {
  const response = fetch('https://chez-toi-api.herokuapp.com/');
  return response
}

export default fetchData;