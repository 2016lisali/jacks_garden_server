import * as loggingRequest from "../models/loggingModel.js";

const getTotalRequest = async (req, res, next) => {
  try {
    const result = await loggingRequest.getTotalRequest(req.ip);
    req.totalRequest = result[result.length - 1].totalRequests;
    next()
  } catch (error) {
    console.log(error);
  }
}

export const insertLog = async (req, res, next) => {
  getTotalRequest(req, res, async () => {
    const date = new Date();
    // const formattedDate = date.toISOString.split("T")[0]
    const log = {
      ip: req.ip,
      userId: req.user?.id || 0,
      usertype: req.user?.isAdmin,
      method: req.method,
      totalRequests: req.totalRequest + 1,
      endpoint: req.url,
      timestamp: date,
    }
    try {
      const result = await loggingRequest.addLog(log);
      // console.log(result);
      next()
    } catch (error) {
      console.log(error.message);
    }
  })

}