import {
  Controller,
  Get,
  NotImplementedException,
  Post,
  Render,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("root")
@Controller()
export class AppController {
  @ApiOperation({ summary: "Get index page" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Get()
  @Render("pages/index")
  root() {}

  @ApiOperation({ summary: "Search advertisements" })
  @ApiResponse({ status: 200, description: "Returns page with search results" })
  @Post()
  searchAdvertisements() {
    throw new NotImplementedException();
  }
}
