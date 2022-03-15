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
import { TypeOrmModule } from "@nestjs/typeorm";
import { parse } from "pg-connection-string";

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   ...parse(
    //     "postgres://cjxvjizunkjwnf:366bd84803c7f936db3538d44d218889076ec15a7d6a079b7b08c45df6fe9770@ec2-63-34-223-144.eu-west-1.compute.amazonaws.com:5432/d10j8qn050q2oe"
    //   ),
    //   synchronize: true,
    //   // autoLoadEntities: true,
    // }),
  ],
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
