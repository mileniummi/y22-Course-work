import { Controller, Get, Render } from "@nestjs/common";

@Controller("advertisements")
export class AdvertisementsController {
  @Get("/")
  @Render("pages/advertisements")
  getFlatList() {}
}
