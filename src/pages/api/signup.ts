import type { NextApiRequest, NextApiResponse } from 'next';
import axiosInstance from '@/lib/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const response = await axiosInstance.post('/auth/sign-up', { email, password });

      if (response.status === 200) {
        const accessToken = response.data.accessToken;
        res.status(200).json({ accessToken, message: 'Signup successful' });
      } else {
        res.status(response.status).json({ message: 'Signup failed' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
