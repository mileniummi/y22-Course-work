import { Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class FavouritesService {
  constructor(private userService: UserService) {}

  async addFavAdv(user: User, id: number) {
    return await this.userService.addFavAdv(user, id);
  }
}
