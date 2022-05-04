import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class ChatOwnerGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const chatId: number = request.params.id;

    const userWithChats = await this.userService.getWithAllChats(user.id);
    let isChatMember = false;
    userWithChats.chats.forEach((chat) => {
      if (chat.id == chatId) {
        isChatMember = true;
      }
    });
    if (isChatMember) {
      return true;
    }
    throw new ForbiddenException();
  }
}
