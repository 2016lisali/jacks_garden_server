import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
const allowlist = ['92.168.1.108'];

// for a given request origin, a count is made of the requests, once the number of requests exceed the
// specified limit , that request origin may no longer make more request in the given time frame
export const dayRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 day
  max: 1000, // Limit each IP to 1000 request per day
  message: "Too many request, please try again later.",
  skip: (req, res) => allowlist.includes(req.ip),
})

export const speedLimiter = slowDown({
  windowMs: 1000, // 1 second
  delayAfter: 1, // allow 1 requests per 1 second, then...
  delayMs: 500, // begin adding 500ms of delay per request above 1:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});
