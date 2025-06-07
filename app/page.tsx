'use client'

import React, { useState, useEffect } from 'react'
import { FaMoneyBillWave, FaChartLine, FaGift, FaUtensils } from 'react-icons/fa'
import { MdSavings } from 'react-icons/md'
import { createClient } from '@supabase/supabase-js'

// ตรวจสอบ environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? 'exists' : 'missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
}

const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

export default function Home() {
  const [expenses, setExpenses] = useState({
    income: 0,
    savings: 0,
    wants: 0,
    needs: 0
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true)
        console.log('Fetching expenses...')
        
        const { data: incomeData, error: incomeError } = await supabase
          .from('expenses')
          .select('amount')
          .eq('type', 'income')
          .single()

        if (incomeError) {
          console.error('Error fetching income:', incomeError)
          setError(incomeError.message)
          return
        }

        const { data: savingsData, error: savingsError } = await supabase
          .from('expenses')
          .select('amount')
          .eq('type', 'savings')
          .single()

        if (savingsError) {
          console.error('Error fetching savings:', savingsError)
          setError(savingsError.message)
          return
        }

        const { data: wantsData, error: wantsError } = await supabase
          .from('expenses')
          .select('amount')
          .eq('type', 'wants')
          .single()

        if (wantsError) {
          console.error('Error fetching wants:', wantsError)
          setError(wantsError.message)
          return
        }

        const { data: needsData, error: needsError } = await supabase
          .from('expenses')
          .select('amount')
          .eq('type', 'needs')
          .single()

        if (needsError) {
          console.error('Error fetching needs:', needsError)
          setError(needsError.message)
          return
        }

        setExpenses({
          income: incomeData?.amount || 0,
          savings: savingsData?.amount || 0,
          wants: wantsData?.amount || 0,
          needs: needsData?.amount || 0
        })
      } catch (err) {
        console.error('Error fetching expenses:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-4">
          <p className="text-center">กำลังโหลด...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-4">
          <p className="text-red-500">Error: {error}</p>
          <p className="text-sm text-gray-500 mt-2">
            Supabase URL: {supabaseUrl ? '✓' : '✗'}<br />
            Supabase Key: {supabaseAnonKey ? '✓' : '✗'}
          </p>
        </div>
      </main>
    )
  }

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