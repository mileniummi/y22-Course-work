import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
  Render,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CreateUserDto } from "../user/dto/create-user.dto";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
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
  login(@Body() user) {
    throw new NotImplementedException();
  }

  @ApiOperation({ summary: "Register in system" })
  @ApiResponse({ status: 201, description: "Returns user token" })
  @ApiBadRequestResponse({ description: "Invalid user credentials" })
  @ApiUnauthorizedResponse({
    description: "User with this username already exists",
  })
  @Post("/register")
  register(@Body() user: CreateUserDto) {
    console.log(user);
  }
}
