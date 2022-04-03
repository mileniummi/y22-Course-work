import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Redirect,
  Render,
  UploadedFiles,
  UseInterceptors,
  Response,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AddAdvertisementService } from "./add-advertisement.service";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";

@Controller("add-advertisement")
export class AddAdvertisementController {
  constructor(private addAdvertisementService: AddAdvertisementService) {}

  @Post("/")
  @Redirect("my-advertisements")
  @UseInterceptors(FilesInterceptor("photos[]"))
  create(
    @Body() advertisement: CreateAdvertisementDto,
    @UploadedFiles() photos: Array<Express.Multer.File>
  ) {
    this.addAdvertisementService.create(advertisement, photos);
  }

  @Get("/")
  @Render("pages/add-advertisement")
  get() {}
}
