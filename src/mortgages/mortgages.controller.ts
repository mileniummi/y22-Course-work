import { Controller, Get, Render } from "@nestjs/common";

@Controller("mortgages")
export class MortgagesController {
  @Get("/")
  @Render("pages/mortgages")
  getMortgageList() {}
}
