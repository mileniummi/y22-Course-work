import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginUserDto } from "../user/dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && bcrypt.compare(user.password, await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS)))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException({
      message: "Неправильный логин или пароль",
    });
  }

  async login(user: LoginUserDto, response) {
    const payload = await this.validateUser(user.username, user.password);
    response.cookie("authorization_token", this.jwtService.sign(payload));
  }

  async register(user: CreateUserDto, response) {
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
    response.cookie("authorization_token", this.jwtService.sign(payload));
  }

  logout(response) {
    response.cookie("authorization_token", "");
  }
}
