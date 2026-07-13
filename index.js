const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/', (req, res) => {
  res.json({
    service: 'nexus-analytics',
    version: '1.0.0',
    endpoints: ['/analytics/overview', '/analytics/events'],
  })
})
//tes
app.get('/analytics/overview', (req, res) => {
  res.json({
    totalUsers: 15483,
    activeSessions: 342,
    pageViewsToday: 8921,
    bounceRate: 24.3,
    avgSessionDuration: '4m 12s',
    topPage: '/dashboard',
  })
})

app.get('/analytics/events', (req, res) => {
  const now = Date.now()
  res.json([
    { id: 1, type: 'page_view',   page: '/dashboard',  timestamp: new Date(now - 12000).toISOString(), userId: 'u_4821' },
    { id: 2, type: 'button_click', page: '/pricing',   timestamp: new Date(now - 34000).toISOString(), userId: 'u_3302' },
    { id: 3, type: 'page_view',   page: '/features',   timestamp: new Date(now - 56000).toISOString(), userId: 'u_9910' },
    { id: 4, type: 'sign_up',     page: '/register',   timestamp: new Date(now - 91000).toISOString(), userId: 'u_1174' },
    { id: 5, type: 'page_view',   page: '/dashboard',  timestamp: new Date(now - 120000).toISOString(), userId: 'u_5530' },
  ])
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => console.log(`nexus-analytics listening on :${PORT}`))
