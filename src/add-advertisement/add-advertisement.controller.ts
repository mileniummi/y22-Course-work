import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import advArray from "../data/advertisementsArray";
import userAdvertisements from "../data/userAdvertisements";
import { nanoid } from "nanoid";

@Controller("add-advertisement")
export class AddAdvertisementController {
  @Post("/")
  @Redirect("my-advertisements")
  @UseInterceptors(FilesInterceptor("photos[]"))
  create(
    @Body() advertisement,
    @UploadedFiles() photos: Array<Express.Multer.File>
  ) {
    advertisement.dateTime = new Date();
    advertisement.photos = photos.map(
      (photo) =>
        `data:${photo.mimetype};base64,${photo.buffer.toString("base64")}`
    );
    advertisement.id = nanoid();
    advArray.push(advertisement);
    userAdvertisements.push(advertisement);
  }

  @Get("/")
  @Render("pages/add-advertisement")
  get() {}
}
