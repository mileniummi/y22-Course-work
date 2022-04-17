import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

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

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: { id: user.id, firstName: user.firstName, lastName: user.lastName },
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: any) {
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
    return this.jwtService.sign(payload);
  }
}
