import { NextApiRequest, NextApiResponse } from 'next';

import { getMinifiedRecords, table } from '@/lib/airtable';

class BadRequestError extends Error {}

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      throw new BadRequestError('wrong api call');
    }

    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

    if (!id) {
      throw new BadRequestError('ID is missing');
    }

    // find a record
    const coffeeStores = await findCoffeeStoresById(id);
    if (coffeeStores.length !== 0) {
      res.json(coffeeStores);
      return;
    }

    //create a record
    if (!name) {
      throw new BadRequestError('name id missing');
    }

    const createRecords = await table.create([
      {
        fields: {
          id,
          name,
          address,
          neighbourhood,
          voting,
          imgUrl,
        },
      },
    ]);
    const records = getMinifiedRecords(createRecords);
    res.json(records);
  } catch (err) {
    if (err instanceof BadRequestError) {
      res.status(400);
      res.json({ message: err.message });
      return;
    }

    res.status(500);
    res.json({ message: 'Something is went wrong...', err });
  }
};

export default createCoffeeStore;

async function findCoffeeStoresById(id: number) {
  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  const records = getMinifiedRecords(findCoffeeStoreRecords);

  return records;
}
