import DashboardLayout from '@/components/dashboard-layout'

export default function Home() {
  return (
    <div>haloooo</div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>{page}</DashboardLayout>
  )
}
