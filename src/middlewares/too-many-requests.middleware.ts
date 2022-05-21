import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { requestsCount } from "./requests.cache";
import { constants } from "http2";

@Injectable()
export class TooManyRequestsMiddleware implements NestMiddleware {
  use(req, res, next: () => void) {
    const clientIp = req.clientIp;
    const now = Date.now();
    const clientRequestsId = requestsCount.findIndex(function (item) {
      return item.ip === clientIp;
    });
    if (clientRequestsId === -1) {
      requestsCount.push({ ip: clientIp, count: 1, lastRequestDate: now });
    } else {
      const clientRequests = requestsCount[clientRequestsId];
      const lastRequestDate = clientRequests.lastRequestDate;
      const diff = Math.ceil(((now - lastRequestDate) / 1000) % 60);
      console.log(diff);
      if (diff < 60) {
        requestsCount[clientRequestsId] = { ...clientRequests, count: ++clientRequests.count };
        if (clientRequests.count > parseInt(process.env.MAX_REQUEST_PER_MINUTE)) {
          throw new HttpException("Too many requests", constants.HTTP_STATUS_TOO_MANY_REQUESTS);
        }
      } else {
        requestsCount[clientRequestsId] = { ...clientRequests, count: 1, lastRequestDate: now };
      }
    }
    return next();
  }
}
