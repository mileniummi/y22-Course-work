import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ServerLoadingTimeInterceptor } from "./server-loading-time.interceptor";
import { TypeOrmModule } from "@nestjs/typeorm";
import { parse } from "pg-connection-string";
import { AddAdvertisementModule } from "./add-advertisement/add-advertisement.module";
import { AdvertisementsModule } from "./advertisements/advertisements.module";
import { FavouritesModule } from "./favourites/favourites.module";
import { MyAdvertisementsModule } from "./my-advertisements/my-advertisements.module";
import { MortgagesModule } from "./mortgages/mortgages.module";
import { AuthModule } from "./auth/auth.module";
import { User } from "./user/entities/user.entity";
import { Advertisement } from "./advertisements/entities/advertisement.entity";

const dbConnection: object = parse(process.env.DATABASE_URL);
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...dbConnection,
      username: process.env.DATABASE_USER,
      type: "postgres",
      synchronize: true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Advertisement],
    }),
    AddAdvertisementModule,
    AdvertisementsModule,
    FavouritesModule,
    MyAdvertisementsModule,
    MortgagesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ServerLoadingTimeInterceptor,
    },
  ],
})
export class AppModule {}
