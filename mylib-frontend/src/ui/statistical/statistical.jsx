"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

// Stat Card Component
function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-(--containerBlack) rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground mt-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      </div>
    </div>
  )
}

// Chart colors
const COLORS = {
  available: "#10b981",
  borrowed: "#f59e0b",
  returned: "#3b82f6",
  overdue: "#ef4444",
  lost: "#8b5cf6",
}

const Statistical = () => {
  const [books, setBooks] = useState([])
  const [borrowOrders, setBorrowOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [booksRes, borrowRes] = await Promise.all([fetch("http://localhost:8080/book"), fetch("http://localhost:8080/borrow")])

        if (!booksRes.ok || !borrowRes.ok) {
          throw new Error("Failed to fetch data")
        }

        const booksData = await booksRes.json()
        const borrowData = await borrowRes.json()

        setBooks(booksData)
        setBorrowOrders(borrowData)
      } catch (err) {
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate statistics
  const totalBooks = books.length
  const totalCopies = books.reduce((sum, book) => sum + book.copyTotal, 0)
  const availableCopies = books.reduce((sum, book) => sum + book.copyAvailable, 0)
  const borrowedCopies = totalCopies - availableCopies

  const totalOrders = borrowOrders.length
  const returnedOrders = borrowOrders.filter((order) => order.status === "RETURNED").length
  const overdueOrders = borrowOrders.filter((order) => order.status === "OVERDUE").length
  const borrowedOrders = borrowOrders.filter((order) => order.status === "BORROWED").length
  const lostOrders = borrowOrders.filter((order) => order.status === "LOST").length
  const overallReturnRate = totalOrders > 0 ? Math.round((returnedOrders / totalOrders) * 100) : 0

  // Availability data for donut chart
  const availabilityData = [
    { name: "Khả Dụng: ", value: availableCopies, color: COLORS.available },
    { name: "Đã cho mượn hoặc mất: ", value: borrowedCopies, color: COLORS.borrowed },
  ]

  const returnRateData = [
    { name: "Đã trả: ", value: returnedOrders, color: COLORS.available },
    { name: "Đang mượn: ", value: borrowedOrders, color: COLORS.borrowed },
    { name: "Quá hạn: ", value: overdueOrders, color: COLORS.overdue },
    { name: "Đã mất: ", value: lostOrders, color: COLORS.lost },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Đang tải số liệu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
          <p className="font-medium">Lỗi khi tải số liệu</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tổng số sách"
          value={totalBooks}
          subtitle="Tổng số đầu sách hiện có trong hệ thống"
        />
        <StatCard
          title="Tổng số lượng sách"
          value={totalCopies}
          subtitle={`Tổng số bản sách vật lý của tất cả các đầu sách.`}
        />
        <StatCard
          title="Số lượng sách đang cho mượn"
          value={borrowedCopies}
          subtitle={`${totalCopies > 0 ? ((borrowedCopies / totalCopies) * 100).toFixed(1) : 0}% của ${totalCopies}`}
        />
        <StatCard
          title="Tỉ lệ trả sách"
          value={`${overallReturnRate}%`}
          subtitle={`${returnedOrders}/${totalOrders} đơn`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart - Copy Availability */}
        <div className="bg-card rounded-lg border border-border p-6 bg-(--containerBlack)">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Số lượng sách khả dụng</h3>
          <div className="flex flex-col items-center">
            <div className="relative w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={availabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {availabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-card-foreground">{totalCopies}</span>
                <span className="text-sm text-muted-foreground">Tổng số lượng sách</span>
              </div>
            </div>
            {/* Legend */}
            <div className="mt-4 flex gap-6">
              {availabilityData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium text-card-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 bg-(--containerBlack)">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Tỉ lệ trả sách</h3>
          <div className="flex flex-col items-center">
            <div className="relative w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={returnRateData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {returnRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-card-foreground">{overallReturnRate}%</span>
                <span className="text-sm text-muted-foreground">Tỉ lệ trả sách</span>
              </div>
            </div>
            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {returnRateData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium text-card-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistical
