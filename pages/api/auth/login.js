import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import ElevatedUser from '../../../models/ElevatedUser';

export default async function loginHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  try {
    let user = await ElevatedUser.findOne({ where: { email } });

    // If user doesn't exist, create it with default password 'honest'
    if (!user) {
      const hashedPassword = await bcrypt.hash('honest', 10);
      user = await ElevatedUser.create({ email, password: hashedPassword });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Set the token in an HTTP-only cookie
    res.setHeader('Set-Cookie', serialize('token', token, { httpOnly: true, path: '/' }));
    return res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
