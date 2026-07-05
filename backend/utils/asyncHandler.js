// Wraps an async controller so rejected promises are forwarded to next(),
// instead of requiring a try/catch block in every controller function.
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
