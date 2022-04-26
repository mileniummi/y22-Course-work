import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.cookies.authorization_token;
      if (token) {
        request.user = this.jwtService.verify(token);
        return true;
      } else {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }
  }
}
