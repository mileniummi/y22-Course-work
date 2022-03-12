import { Controller, Get, Render } from "@nestjs/common";

@Controller("favourites")
export class FavouritesController {
  @Get("/")
  @Render("pages/favourites")
  getFavouriteAdvertisements() {}
}
