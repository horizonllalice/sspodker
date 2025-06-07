import React from 'react'
import { FaMoneyBillWave, FaChartLine, FaGift, FaUtensils } from 'react-icons/fa'
import { MdSavings } from 'react-icons/md'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">รายรับ</h2>
            <FaMoneyBillWave className="text-green-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-green-500">0 บาท</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">เงินออม</h2>
            <MdSavings className="text-blue-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-blue-500">0 บาท</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">ความต้องการ</h2>
            <FaGift className="text-purple-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-purple-500">0 บาท</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">ค่าใช้จ่าย</h2>
            <FaUtensils className="text-red-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-red-500">0 บาท</p>
        </div>
      </div>
    </main>
  )
} 