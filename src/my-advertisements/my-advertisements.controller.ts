import { Controller, Get, Render } from "@nestjs/common";
import userAdvertisements from "../data/userAdvertisements";

@Controller("my-advertisements")
export class MyAdvertisementsController {
  @Get("/")
  @Render("pages/my-advertisements")
  getMyAdvertisements() {
    console.log(userAdvertisements);
    return { advertisements: userAdvertisements };
  }
}
