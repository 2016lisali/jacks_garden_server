import * as loggingRequest from "../models/loggingModel.js";

const getTotalRequest = async (req, res, next) => {
  try {
    const result = await loggingRequest.getTotalRequest(req.ip);
    result.length > 0 ? (req.totalRequest = result[result.length - 1].totalRequests) : (req.totalRequest = 0);
    next()
  } catch (error) {
    console.log(error);
  }
}

export const insertLog = async (req, res, next) => {
  getTotalRequest(req, res, async () => {
    const date = new Date();
    const log = {
      ip: req.ip,
      userId: req.user?.id || 0,
      usertype: req.user?.isAdmin || "announymous",
      method: req.method,
      totalRequests: req.totalRequest + 1,
      endpoint: req.url,
      timestamp: date,
    }
    try {
      const result = await loggingRequest.addLog(log);
      next()
    } catch (error) {
      console.log(error.message);
    }
  })
}