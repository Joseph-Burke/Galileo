const fetchData = async () => {
  const response = fetch('http://localhost:4000/tasks', { mode: 'cors' });
  return response
}

export default fetchData;