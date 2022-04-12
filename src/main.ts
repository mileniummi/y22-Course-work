import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as hbs from "hbs";
import * as expressHbs from "express-handlebars";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Home-Hunter")
    .setDescription("MVC app for selling flats and houses")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));

  app.setViewEngine("hbs");

  hbs.registerPartials(join(__dirname, "..", "views/partials"));
  hbs.registerPartials(join(__dirname, "..", "views/layouts"));

  app.engine(
    "hbs",
    expressHbs.engine({
      layoutsDir: "views/layouts",
      defaultLayout: "layout",
      extname: "hbs",
      helpers: {
        math: function (left_value, operation, right_value) {
          left_value = parseInt(left_value);
          right_value = parseInt(right_value);
          return {
            "+": left_value + right_value,
          }[operation];
        },
      },
    })
  );

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}

bootstrap();
