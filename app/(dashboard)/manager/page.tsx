import RevenueChart from '@/app/_components/admin/RevenueChart'
import { revenue } from '@/app/_lib/data/data'

import React from 'react'

export default function ManagerPage() {
  return (
    <main>
       <RevenueChart revenue={revenue}/>
    </main>
  )
}
