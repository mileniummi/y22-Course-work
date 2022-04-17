import { Body, Controller, Get, Post, Request, Render, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOperation({ summary: "Get login page" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Get("/login")
  @Render("pages/login")
  getLoginPage() {
    return;
  }

  @ApiOperation({ summary: "Get register page" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Get("/register")
  @Render("pages/register")
  getRegisterPage() {
    return;
  }

  @ApiOperation({ summary: "Log in system" })
  @ApiResponse({ status: 200, description: "Returns user token" })
  @ApiBadRequestResponse({ description: "Invalid user credentials" })
  @ApiResponse({
    status: 401,
    description: "Username or password not correct",
  })
  @UseGuards(AuthGuard("local"))
  @Post("/login")
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @ApiOperation({ summary: "Register in system" })
  @ApiResponse({ status: 201, description: "Returns user token" })
  @ApiBadRequestResponse({ description: "Invalid user credentials" })
  @ApiUnauthorizedResponse({
    description: "User with this username already exists",
  })
  @Post("/register")
  async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }
}
