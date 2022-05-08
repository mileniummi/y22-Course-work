import { Controller, Get, Param, ParseIntPipe, Query, Render, Res, UseGuards } from "@nestjs/common";
import { MessagesService } from "./services/messages.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import AuthUser from "../auth/auth.user.decorator";
import { User } from "../user/entities/user.entity";
import { ApiConflictResponse, ApiCookieAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ChatOwnerGuard } from "../auth/chat-owner.guard";

@Controller("Messages")
@UseGuards(JwtAuthGuard)
@ApiTags("messages")
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
  @Get()
  @Render("pages/chats")
  @ApiCookieAuth()
  @ApiOkResponse({ description: "success, returns html text" })
  @ApiUnauthorizedResponse()
  async getAllChats(@AuthUser() user: User) {
    return await this.messagesService.getAllChats(user);
  }

  @Get("/dialog")
  @ApiCookieAuth()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ description: "success, returns html text" })
  @Render("pages/init_chat_page")
  getOne(@Query("advId") advId: number) {
    return { advId };
  }

  @Get("/new-dialog")
  @ApiCookieAuth()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ description: "success, returns html text" })
  @ApiConflictResponse({ description: "user wants to chat with himself" })
  async createChat(@Query("advId") advId: number, @AuthUser() user: User, @Res() response) {
    const dbChat = await this.messagesService.addChat(advId, user);
    return response.redirect(`/messages/dialog/${dbChat.id}`);
  }

  @Get("/dialog/:id")
  @ApiCookieAuth()
  @UseGuards(ChatOwnerGuard)
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ description: "success, returns html text" })
  @Render("pages/dialog")
  async getOneChat(@Param("id", ParseIntPipe) advId: number, @AuthUser() user: User) {
    return { advId, user, websocketsPath: `${process.env.DOMAIN}` };
  }
}
