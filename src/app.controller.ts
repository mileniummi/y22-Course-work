import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  @Render("pages/index")
  root() {
    return { message: "Hello world!" };
  }

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
