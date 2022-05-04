import { Controller, Get, Render } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("root")
@Controller()
export class AppController {
  @ApiOperation({ summary: "Get index page" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Get()
  @Render("pages/index")
  root() {
    return;
  }

  @ApiOperation({ summary: "Get page not found" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Get("/page_not_found")
  @Render("pages/page_not_found")
  getPageNotFound() {
    return;
  }

  @ApiOperation({ summary: "Get page forbidden" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Get("/page_forbidden")
  @Render("pages/page_forbidden")
  getPageForbidden() {
    return;
  }
}
