import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as hbs from "hbs";
import * as expressHbs from "express-handlebars";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { UnauthFilter } from "./filters/unauth.filter";
import { PageNotFoundFilter } from "./filters/page_not_found.filter";
import { ServerLoadingTimeInterceptor } from "./server-loading-time.interceptor";
import { ForbiddenFilter } from "./filters/forbidden.filter";
import * as requestIp from "request-ip";
import { TooMayRequestsInterceptor } from "./too-may-requests.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Home-Hunter")
    .setDescription("MVC app for selling flats and houses")
    .setVersion("1.0")
    .addCookieAuth("authorization_token")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));

  app.setViewEngine("hbs");

  hbs.registerPartials(join(__dirname, "..", "views/partials"));
  hbs.registerPartials(join(__dirname, "..", "views/layouts"));

  app.use(cookieParser());

  app.engine(
    "hbs",
    expressHbs.engine({
      layoutsDir: "views/layouts",
      defaultLayout: "layout",
      extname: "hbs",
      helpers: {
        math: function (left_value, operation, right_value) {
          return {
            "+": parseInt(left_value) + parseInt(right_value),
          }[operation];
        },
        times: function (n, block) {
          let accum = "";
          for (let i = 1; i <= n; ++i) accum += block.fn(i);
          return accum;
        },
      },
    })
  );

  app.useGlobalInterceptors(new ServerLoadingTimeInterceptor());
  app.use(requestIp.mw());
  app.useGlobalFilters(new UnauthFilter(), new PageNotFoundFilter(), new ForbiddenFilter());

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}

bootstrap();
