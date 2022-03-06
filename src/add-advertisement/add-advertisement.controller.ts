import { Body, Controller, Get, Post, Render } from "@nestjs/common";

@Controller("add-advertisement")
export class AddAdvertisementController {
  @Post("/")
  create(@Body() advertisement) {
    console.log(advertisement);
  }

  @Get("/")
  @Render("pages/add-advertisement")
  get() {}
}
