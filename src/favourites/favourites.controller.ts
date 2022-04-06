import { Controller, Get, Render } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Favourite advertisements")
@Controller("favourites")
export class FavouritesController {
  @Get("/")
  @ApiOperation({ summary: "Get all favourite advertisements" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Render("pages/favourites")
  getFavouriteAdvertisements() {}
}
