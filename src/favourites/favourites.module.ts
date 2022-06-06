import { Module } from "@nestjs/common";
import { FavouritesController } from "./favourites.controller";
import { AuthModule } from "../auth/auth.module";
import { FavouritesService } from "./favourites.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [AuthModule, UserModule],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
