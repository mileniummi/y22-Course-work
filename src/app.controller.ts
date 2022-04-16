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
}
