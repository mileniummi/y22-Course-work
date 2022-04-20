import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && bcrypt.compare(user.password, await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS)))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserDto, response: Response) {
    const payload = await this.validateUser(user.username, user.password);
    response.cookie("token", this.jwtService.sign(payload));
  }

  async register(user: CreateUserDto, response: Response) {
    const dbUser = await this.userService.findOne(user.username);
    if (dbUser) {
      throw new UnauthorizedException("This username is already taken!");
    }
    const hashedPassword = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_ROUNDS));
    const newUser = await this.userService.create({
      ...user,
      password: hashedPassword,
    });
    const { password, ...payload } = newUser;
    response.cookie("token", this.jwtService.sign(payload));
  }
}
