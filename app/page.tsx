'use client'

import React, { useState, useEffect } from 'react'
import { FaMoneyBillWave, FaChartLine, FaGift, FaUtensils } from 'react-icons/fa'
import { MdSavings } from 'react-icons/md'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [expenses, setExpenses] = useState({
    income: 0,
    savings: 0,
    wants: 0,
    needs: 0
  })

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data: incomeData } = await supabase
        .from('expenses')
        .select('amount')
        .eq('type', 'income')
        .single()

      const { data: savingsData } = await supabase
        .from('expenses')
        .select('amount')
        .eq('type', 'savings')
        .single()

      const { data: wantsData } = await supabase
        .from('expenses')
        .select('amount')
        .eq('type', 'wants')
        .single()

      const { data: needsData } = await supabase
        .from('expenses')
        .select('amount')
        .eq('type', 'needs')
        .single()

      setExpenses({
        income: incomeData?.amount || 0,
        savings: savingsData?.amount || 0,
        wants: wantsData?.amount || 0,
        needs: needsData?.amount || 0
      })
    }

    fetchExpenses()
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">รายรับ</h2>
            <FaMoneyBillWave className="text-green-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-green-500">{expenses.income} บาท</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">เงินออม</h2>
            <MdSavings className="text-blue-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-blue-500">{expenses.savings} บาท</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">ความต้องการ</h2>
            <FaGift className="text-purple-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-purple-500">{expenses.wants} บาท</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">ค่าใช้จ่าย</h2>
            <FaUtensils className="text-red-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-red-500">{expenses.needs} บาท</p>
        </div>
      </div>
    </main>
  )
} 