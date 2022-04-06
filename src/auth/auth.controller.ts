import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
  Render,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  @ApiOperation({ summary: "Get login page" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Get("/login")
  @Render("pages/login")
  getLoginPage() {}

  @ApiOperation({ summary: "Get register page" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Get("/register")
  @Render("pages/register")
  getRegisterPage() {
    return {};
  }

  @ApiOperation({ summary: "Log in system" })
  @ApiResponse({ status: 200, description: "Returns user token" })
  @ApiResponse({
    status: 401,
    description: "Username or password not correct",
  })
  @Post("/login")
  login(@Body() user) {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: "Register in system" })
  @ApiResponse({ status: 200, description: "Returns user token" })
  @ApiResponse({
    status: 401,
    description: "User with this username already exists",
  })
  @Post("/register")
  register(@Body() user) {
    throw new NotImplementedException();
  }
}
