import { Controller, Get, Param, Post, Query, Redirect, Render, Res, UseGuards } from "@nestjs/common";
import { MessagesService } from "./services/messages.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import AuthUser from "../auth/auth.user.decorator";
import { User } from "../user/entities/user.entity";
import { Response } from "express";

@Controller("messages")
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
  @Get()
  @Render("pages/messages")
  getAllChats() {
    return;
  }

  @Get("/dialog")
  @Render("pages/init_chat_page")
  getOne(@Query("advId") advId: number) {
    return { advId };
  }

  @Get("/new-dialog")
  @UseGuards(JwtAuthGuard)
  async createChat(@Query("advId") advId: number, @AuthUser() user: User, @Res() response) {
    const dbChat = await this.messagesService.addChat(advId, user);
    return response.redirect(`/messages/dialog/${dbChat.id}`);
  }

  @Get("/dialog/:id")
  @UseGuards(JwtAuthGuard)
  @Render("pages/dialog")
  async getOneChat(@Param("id") advId, @AuthUser() user: User) {
    return { advId, user };
  }

  // @Post("/dialog/:id")
  // @UseGuards(JwtAuthGuard)
  // @Render("pages/dialog")
  // async addMsgToChat(@Param("id") advId: number, @AuthUser() user: User) {
  //   return await this.messagesService.addMessageToChat(user,)
  // }
}
