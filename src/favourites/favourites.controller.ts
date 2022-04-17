import { Controller, Get, Render, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Favourite advertisements")
@Controller("favourites")
export class FavouritesController {
  @Get("/")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all favourite advertisements" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Render("pages/favourites")
  getFavouriteAdvertisements() {
    return;
  }
}
