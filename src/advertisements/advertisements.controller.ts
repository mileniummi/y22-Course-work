import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AdvertisementsService } from "./advertisements.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Advertisement } from "./entities/advertisement.entity";

@ApiTags("Advertisements")
@Controller("advertisements")
export class AdvertisementsController {
  constructor(private advertisementsService: AdvertisementsService) {}

  @ApiOperation({ summary: "Get search advertisements" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/")
  @Render("pages/flats_list")
  async getFlatList() {
    return await this.advertisementsService.getFlatList();
  }

  // add page for rent

  @ApiOperation({ summary: "Get advertisements which were added by user" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/my")
  @Render("pages/my-advertisements")
  getMyAdvertisements() {
    return {};
  }

  @ApiOperation({ summary: "Fill in the form and add new advertisement" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Post("/add")
  @Redirect("my")
  @UseInterceptors(FilesInterceptor("photos[]"))
  create(
    @Body() advertisement: CreateAdvertisementDto,
    @UploadedFiles() photos: Array<Express.Multer.File>
  ) {
    this.advertisementsService.create(advertisement, photos);
  }

  @ApiOperation({ summary: "Get page with form" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/add")
  @Render("pages/add-advertisement")
  get() {}

  @ApiOperation({ summary: "Get page of current advertisement by id" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/:id")
  @Render("pages/flat_page")
  async getOneFlat(@Param("id") id: number) {
    return await this.advertisementsService.getSingleFlat(id);
  }
}
