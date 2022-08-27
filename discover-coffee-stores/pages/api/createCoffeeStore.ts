import { NextApiRequest, NextApiResponse } from 'next';

import table from '@/lib/airtable';

const createCoffeeStore = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });

  const findCoffeeStoreRecords = await table
    .select({
      filterByFormula: `id="0"`,
    })
    .firstPage();

  console.log({ findCoffeeStoreRecords });

  if (findCoffeeStoreRecords.length !== 0) {
    res.json(findCoffeeStoreRecords);
  } else {
    //create a record
    res.json({ message: 'create a record' });
  }
};

export default createCoffeeStore;
