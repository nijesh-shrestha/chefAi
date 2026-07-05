import { describe, it, expect } from '@jest/globals'
import request from 'supertest'
import app from '../app.js'

describe('Recipe routes - validation', () => {
  it('GET /api/recipes/search without q returns 400', async () => {
    const res = await request(app).get('/api/recipes/search')

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toMatch(/query parameter "q"/i)
  })

  it('GET /api/recipes/ingredient without name returns 400', async () => {
    const res = await request(app).get('/api/recipes/ingredient')

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
  })
})

describe('POST /api/chat - validation', () => {
  it('rejects a request with no message', async () => {
    const res = await request(app).post('/api/chat').send({})

    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toMatch(/message.*required/i)
  })
})

describe('Unmatched routes', () => {
  it('returns 404 for an unknown route', async () => {
    const res = await request(app).get('/api/does-not-exist')

    expect(res.status).toBe(404)
    expect(res.body.success).toBe(false)
  })
})
