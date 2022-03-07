import { Body, Controller, Get, Post, Render } from "@nestjs/common";

@Controller("login")
export class LoginController {
  @Get("/")
  @Render("pages/login")
  getLoginPage() {}

  @Post("/")
  getUser(@Body() user) {
    console.log(user);
  }
}
