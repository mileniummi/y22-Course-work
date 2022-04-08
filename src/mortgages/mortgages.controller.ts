import { Controller, Get, Render } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Mortgages")
@Controller("mortgages")
export class MortgagesController {
  @ApiOperation({ summary: "Get all mortgages" })
  @ApiResponse({ status: 200, description: "success, returns html text" })
  @Get("/")
  @Render("pages/mortgages")
  getMortgageList() {}
}
