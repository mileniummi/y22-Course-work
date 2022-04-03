import { Body, Controller, Get, Post, Render } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Get("/")
  @Render("pages/login")
  getLoginPage() {}

  @Post("/")
  getUser(@Body() user) {}
}
