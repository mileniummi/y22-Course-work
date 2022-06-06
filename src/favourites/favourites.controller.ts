import { ConflictException, Controller, Get, Param, ParseIntPipe, Put, Render, UseGuards } from "@nestjs/common";
import { ApiConflictResponse, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import AuthUser from "../auth/auth.user.decorator";
import { FavouritesService } from "./favourites.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "../user/entities/user.entity";

@ApiTags("Favourite advertisements")
@Controller("favourites")
export class FavouritesController {
  constructor(private favouritesService: FavouritesService) {}
  @Get("/")
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: "Get all favourite advertisements" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Render("pages/favourites")
  async getFavouriteAdvertisements(@AuthUser() user: User) {
    const dbUser = await this.favouritesService.getFavAdv(user);
    return { display: dbUser.favAdvs.length, advertisements: dbUser.favAdvs };
  }

  @Put("/:id")
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: "Get all favourite advertisements" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @ApiConflictResponse({ description: "Advertisement is already in favourites list" })
  async addToFavourites(@AuthUser() user: User, @Param("id", ParseIntPipe) id: number) {
    try {
      await this.favouritesService.addFavAdv(user, id);
    } catch (err) {
      throw new ConflictException({}, "Advertisement is already in favourites list");
    }
  }
}
