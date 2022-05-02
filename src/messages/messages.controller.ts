import { Controller, Get, Param, Post, Render, UseGuards } from "@nestjs/common";
import { MessagesService } from "./services/messages.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import AuthUser from "../auth/auth.user.decorator";
import { User } from "../user/entities/user.entity";

@Controller("messages")
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
  @Get()
  @Render("pages/messages")
  getAllChats() {
    return;
  }

  @Get("/dialog")
  @Render("pages/dialog")
  getOne() {
    return;
  }
  @Get("/dialog/:id")
  @UseGuards(JwtAuthGuard)
  @Render("pages/dialog")
  async getOneChat(@Param("id") advId: number, @AuthUser() user: User) {
    return;
  }

  // @Post("/dialog/:id")
  // @UseGuards(JwtAuthGuard)
  // @Render("pages/dialog")
  // async addMsgToChat(@Param("id") advId: number, @AuthUser() user: User) {
  //   return await this.messagesService.addMessageToChat(user,)
  // }
}
