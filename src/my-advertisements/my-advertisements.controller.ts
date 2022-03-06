import { Controller, Get, Render } from "@nestjs/common";

@Controller("my-advertisements")
export class MyAdvertisementsController {
  @Get("/")
  @Render("pages/my-advertisements")
  getMyAdvertisements() {}
}
