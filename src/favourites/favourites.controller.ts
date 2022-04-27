import { Controller, Get, Param, ParseIntPipe, Put, Render, UseGuards } from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import AuthUser from "../auth/auth.user.decorator";
import { User } from "../user/entities/user.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Favourite advertisements")
@Controller("favourites")
export class FavouritesController {
  @Get("/")
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: "Get all favourite advertisements" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Render("pages/favourites")
  getFavouriteAdvertisements() {
    return;
  }
}
