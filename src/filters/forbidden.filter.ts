import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch(ForbiddenException)
export class ForbiddenFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.FORBIDDEN).redirect("/page_forbidden");
  }
}
