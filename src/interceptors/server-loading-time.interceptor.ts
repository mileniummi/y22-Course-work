import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class ServerLoadingTimeInterceptor implements NestInterceptor {
  intercept = (context: ExecutionContext, next: CallHandler<any>): Observable<any> => {
    const start = Date.now();
    return next.handle().pipe(map((data) => ({ ...data, loadingTime: (Date.now() - start).toString() })));
  };
}
