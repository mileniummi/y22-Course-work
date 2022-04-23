import { Body, Controller, Get, Post, Redirect, Render, Req, Res } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { Response } from "express";

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
  @Post("/login")
  async login(@Body() credentials: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(credentials, response);
  }

  @ApiOperation({ summary: "Register in system" })
  @ApiResponse({ status: 201, description: "Returns user token" })
  @ApiBadRequestResponse({ description: "Invalid user credentials" })
  @ApiUnauthorizedResponse({
    description: "User with this username already exists",
  })
  @Post("/register")
  async register(@Body() user: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    return await this.authService.register(user, response);
  }
}
