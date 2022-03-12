import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as hbs from "hbs";
import * as expressHbs from "express-handlebars";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  hbs.registerPartials(join(__dirname, "..", "views/partials"));
  hbs.registerPartials(join(__dirname, "..", "views/layouts"));
  app.engine(
    "hbs",
    expressHbs.engine({
      layoutsDir: "views/layouts",
      defaultLayout: "layout",
      extname: "hbs",
    })
  );
  app.setViewEngine("hbs");

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}

bootstrap();
