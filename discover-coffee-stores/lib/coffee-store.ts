import { CoffeeStore } from '@/types/coffee-store';

const getUrlForCoffeeStores = (query: string, lat: number, lng: number, limit: number): string => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${lat},${lng}&limit=${limit}`;
};

export const fetchCoffeeStores = async (): Promise<CoffeeStore[]> => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };
  const url = getUrlForCoffeeStores('커피', 37.5087, 127.0632, 6);

  console.log(options, url);

  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
  let coffeeStores: CoffeeStore[] = [];
  if (data.results) {
    coffeeStores = data.results.map((d: any) => ({
      id: d.fsq_id,
      name: d.name,
      imgUrl:
        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      websiteUrl: 'https://www.strangelovecoffee.ca/',
      address: d.location.formatted_address,
      neighbourhood: 'at King and Spadina',
    }));
  }
  return coffeeStores;
};
