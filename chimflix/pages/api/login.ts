import type { NextApiRequest, NextApiResponse } from 'next';
import { magicAdmin } from '../../lib/magic';
import jwt from 'jsonwebtoken';
import { isNewUser } from '@/lib/db/hasura';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substring(7) : '';
      console.log({ didToken });

      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      console.log({ metadata });

      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', 'admin'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${metadata.issuer}`,
          },
        },
        String(process.env.JWT_SECRET)
      );
      console.log({ token });

      const newUser = await isNewUser(token, String(metadata.issuer));

      res.send({ done: true, newUser });
    } catch (error) {
      console.error('Something went wrong logging in', error);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
