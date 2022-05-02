import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdvertisementsModule } from "./advertisements/advertisements.module";
import { FavouritesModule } from "./favourites/favourites.module";
import { MortgagesModule } from "./mortgages/mortgages.module";
import { AuthModule } from "./auth/auth.module";
import { getConnectionOptions } from "typeorm";
import { join } from "path";
import { UserModule } from "./user/user.module";
import { ServerLoadingTimeInterceptor } from "./server-loading-time.interceptor";
import { MessagesGateway } from "./messager.gateway";
import { MessagesModule } from "./messages/messages.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          url: process.env.DATABASE_URL,
          entities: [join(__dirname, "**", "*.entity.{ts,js}")],
        }),
    }),
    AdvertisementsModule,
    FavouritesModule,
    MortgagesModule,
    AuthModule,
    UserModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessagesGateway],
})
export class AppModule {}
