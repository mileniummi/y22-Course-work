import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MortgagesController } from "./mortgages/mortgages.controller";
import { LoginController } from "./login/login.controller";
import { FavouritesController } from "./favourites/favourites.controller";
import { MyAdvertisementsController } from "./my-advertisements/my-advertisements.controller";
import { AddAdvertisementController } from "./add-advertisement/add-advertisement.controller";
import { AdvertisementsController } from "./advertisements/advertisements.controller";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./logging.interceptor";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    MortgagesController,
    LoginController,
    FavouritesController,
    MyAdvertisementsController,
    AddAdvertisementController,
    AdvertisementsController,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
