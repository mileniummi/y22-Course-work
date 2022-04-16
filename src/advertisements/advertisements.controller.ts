import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Render,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AdvertisementsService } from "./advertisements.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Advertisement, DealType } from "./entities/advertisement.entity";
import { SearchAdvertisementDto } from "./dto/search-advertisement.dto";

@ApiTags("Advertisements")
@Controller("advertisements")
export class AdvertisementsController {
  constructor(private advertisementsService: AdvertisementsService) {}

  @ApiOperation({ summary: "Get search advertisements" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/sell")
  @Render("pages/flats_list")
  async getSellAdvList(@Query() searchOptions: SearchAdvertisementDto) {
    return await this.advertisementsService.getAll(
      searchOptions,
      DealType.SELL
    );
  }

  @ApiOperation({ summary: "Get search advertisements for rent" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/rent")
  @Render("pages/flats_list")
  async getRentAdvList(@Query() searchOptions: SearchAdvertisementDto) {
    return await this.advertisementsService.getAll(
      searchOptions,
      DealType.RENT
    );
  }

  @ApiOperation({ summary: "Get advertisements which were added by user" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/my")
  @Render("pages/my-advertisements")
  getMyAdvertisements() {
    return {};
  }

  @ApiOperation({ summary: "Fill in the form and add new advertisement" })
  @ApiResponse({ status: 201, type: [Advertisement] })
  @ApiBadRequestResponse({ description: "Invalid advertisement object fields" })
  @Redirect("/advertisements/my")
  @UseInterceptors(FilesInterceptor("photos[]"))
  @Post()
  async create(
    @Body() advertisement: CreateAdvertisementDto,
    @UploadedFiles() photos: Array<Express.Multer.File>
  ) {
    await this.advertisementsService.create(advertisement, photos);
  }

  @ApiOperation({ summary: "Get page with form" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/add")
  @Render("pages/add-advertisement")
  getAddAdvertisementPage() {}

  @ApiOperation({ summary: "Get page of current advertisement by id" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/:id")
  @Render("pages/flat_page")
  async getOne(@Param("id", ParseIntPipe) id: number) {
    return await this.advertisementsService.getOne(id);
  }
}
