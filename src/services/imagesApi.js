const BASE_URL = 'https://pixabay.com';
const API_KEY = '23351611-7864196d6829752dad19e3759';

export default async function fetchImages(searchQuery, page) {
  const response = await fetch(
    `${BASE_URL}/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}
