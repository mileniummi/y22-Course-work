import { Controller, Get, Render } from "@nestjs/common";

@Controller("messages")
export class MessagesController {
  @Get()
  @Render("pages/messages")
  getAllChats() {
    return;
  }
}
