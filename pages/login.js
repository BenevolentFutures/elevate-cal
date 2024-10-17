import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('honest'); // Default password

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('/timeline');
    } else {
      const { message } = await res.json();
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            className="mt-1 block w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* Hide the password field since it's defaulted */}
        <input type="hidden" value={password} />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-4">
          Login
        </button>
      </form>
    </div>
  );
}