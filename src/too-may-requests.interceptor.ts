import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class TooMayRequestsInterceptor implements NestInterceptor {
  intercept = (context: ExecutionContext, next: CallHandler<any>): Observable<any> => {
    const ip = context.switchToHttp().getRequest().clientIp;
    console.log(ip);
    const start = Date.now();
    return next.handle().pipe(map((data) => ({ ...data, loadingTime: (Date.now() - start).toString() })));
  };
}
