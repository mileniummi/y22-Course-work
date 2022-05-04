import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  constructor(private page: string) {}
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const dto = ctx.getRequest<Request>().body;
    const exceptions = exception.getResponse().message;
    const status = exception.getStatus();

    const errorObject = {};
    Object.keys(dto).forEach((prop) => {
      for (const ex of exceptions) {
        console.log(ex);
        console.log(prop);
        if (ex.includes(prop)) {
          errorObject[prop] = ex;
        }
      }
    });
    response
      .status(status)
      .send({ ...errorObject })
      .render(this.page);
  }
}
