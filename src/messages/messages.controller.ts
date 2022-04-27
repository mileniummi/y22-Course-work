import { Controller, Get, Param, ParseIntPipe, Render } from "@nestjs/common";

@Controller("messages")
export class MessagesController {
  @Get()
  @Render("pages/messages")
  getAllChats() {
    return;
  }

  @Get("/dialog/:id")
  @Render("pages/dialog")
  geOneChat(@Param("id", ParseIntPipe) id: number) {
    return;
  }
}
