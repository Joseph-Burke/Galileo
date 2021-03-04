const fetchData = async () => {
  let response = await fetch('http://localhost:4000/tasks', { mode: 'cors' });
  response = await response.json();

  return response
}

export default fetchData;