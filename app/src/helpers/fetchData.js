const fetchData = async () => {
  const response = await fetch('http://localhost:4000/tasks', { mode: 'cors' }).then(response => response.json());
  return response
}

export default fetchData;