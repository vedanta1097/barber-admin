import { useState } from 'react';
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      setIsError(false)
      const resp = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const userData = await resp.json()
      if (userData && userData.accessToken) {
        const isAdmin = userData.roles[0] === 'ROLE_ADMIN'
        console.log('login success', isAdmin)
        if (!isAdmin) {
          setIsError(true)
          return
        }
        localStorage.setItem('userData', JSON.stringify(userData))
        router.replace('/')
      } else {
        setIsError(true)
      }
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div>
      <div className='block my-12'>
        <h1 className='font-bold text-xl text-center'>WELCOME TO <br/>FOREVER BARBERSHOP ADMIN</h1>
      </div>
      <form onSubmit={handleSubmit} className='max-w-lg mx-auto'>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow appearance-none text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={isLoading}
          >
            Log In
          </button>
        </div>
        {
          isError ? <div className='text-red-700'>Username atau Password salah!</div> : <></>
        }
      </form>
    </div>
  )
}
