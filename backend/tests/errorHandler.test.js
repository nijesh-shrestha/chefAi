import { describe, it, expect, jest } from '@jest/globals'
import { errorHandler } from '../middleware/errorHandler.js'
import { ApiError } from '../utils/ApiError.js'

function mockRes() {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('errorHandler middleware', () => {
  it('uses the status code and message from an ApiError', () => {
    const err = new ApiError(404, 'Recipe not found')
    const res = mockRes()

    errorHandler(err, {}, res, () => {})

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: 'Recipe not found' })
    )
  })

  it('defaults unknown errors to a 500', () => {
    const err = new Error('Something broke')
    const res = mockRes()

    errorHandler(err, {}, res, () => {})

    expect(res.status).toHaveBeenCalledWith(500)
  })

  it('maps Axios-shaped errors to their upstream status code', () => {
    const err = { isAxiosError: true, response: { status: 404, data: {} }, message: 'Not Found' }
    const res = mockRes()

    errorHandler(err, {}, res, () => {})

    expect(res.status).toHaveBeenCalledWith(404)
  })
})
