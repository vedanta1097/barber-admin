import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function DashboardLayout({ children }) {
  const router = useRouter()

  useEffect(() => {
    const storageUserData = localStorage.getItem('userData')
    const userData = storageUserData ? JSON.parse(storageUserData) : undefined
    if (!userData) {
      router.push('/login')
    }
  }, [])

  return (
    <>
      <div>navbar</div>
      <main>{children}</main>
    </>
  )
}
