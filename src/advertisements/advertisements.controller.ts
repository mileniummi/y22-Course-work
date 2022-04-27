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
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AdvertisementsService } from "./advertisements.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Advertisement, DealType } from "./entities/advertisement.entity";
import { SearchAdvertisementDto } from "./dto/search-advertisement.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import AuthUser from "../auth/auth.user.decorator";
import { User } from "../user/entities/user.entity";
import { InvalidRouteFilter } from "../filters/invalid.route.filter";

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
      DealType.SELL,
      searchOptions.page,
      searchOptions.limit
    );
  }

  @ApiOperation({ summary: "Get search advertisements for rent" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/rent")
  @Render("pages/flats_list")
  async getRentAdvList(@Query() searchOptions: SearchAdvertisementDto) {
    return await this.advertisementsService.getAll(
      searchOptions,
      DealType.RENT,
      searchOptions.page,
      searchOptions.limit
    );
  }

  @ApiOperation({ summary: "Get advertisements which were added by user" })
  @ApiResponse({ status: 200, type: [Advertisement], description: "success, returns html text" })
  @Get("/my")
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @Render("pages/my-advertisements")
  getMyAdvertisements(@AuthUser() user: User) {
    return { user };
  }

  @ApiOperation({ summary: "Fill in the form and add new advertisement" })
  @ApiResponse({ status: 201, type: [Advertisement] })
  @ApiBadRequestResponse({ description: "Invalid advertisement object fields" })
  @Redirect("/advertisements/my")
  @UseInterceptors(FilesInterceptor("photos[]"))
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @Post()
  async create(@Body() advertisement: CreateAdvertisementDto, @UploadedFiles() photos: Array<Express.Multer.File>) {
    await this.advertisementsService.create(advertisement, photos);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: "Get page with form" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @Get("/add")
  @Render("pages/add-advertisement")
  getAddAdvertisementPage() {
    return;
  }

  @ApiOperation({ summary: "Get page of current advertisement by id" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  @ApiNotFoundResponse({ description: "Invalid route" })
  @UseFilters(InvalidRouteFilter)
  @Get("/:id")
  @Render("pages/flat_page")
  async getOne(@Param("id", ParseIntPipe) id: number) {
    return await this.advertisementsService.getOne(id);
  }
}
