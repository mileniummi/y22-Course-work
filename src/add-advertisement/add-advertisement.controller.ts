import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import advArray from "../data/advertisementsArray";
import userAdvertisements from "../data/userAdvertisements";

@Controller("add-advertisement")
export class AddAdvertisementController {
  @Post("/")
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
    advArray.push(advertisement);
    userAdvertisements.push(advertisement);
  }

  @Get("/")
  @Render("pages/add-advertisement")
  get() {}
}
