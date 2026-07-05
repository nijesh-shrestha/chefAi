import { describe, it, expect } from '@jest/globals'
import request from 'supertest'
import app from '../app.js'

describe('GET /health', () => {
  it('returns 200 and a success payload', async () => {
    const res = await request(app).get('/health')

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })
})
