import { Controller, Get, Param, Render } from "@nestjs/common";
import advArray from "../data/advertisementsArray";
import { AdvertisementsService } from "./advertisements.service";

@Controller("advertisements")
export class AdvertisementsController {
  constructor(private advertisementsService: AdvertisementsService) {}

  @Get("/")
  @Render("pages/flats_list")
  async getFlatList() {
    return await this.advertisementsService.getFlatList();
  }

  @Get("/:id")
  @Render("pages/flat_page")
  async getOneFlat(@Param("id") id: string) {
    return await this.advertisementsService.getSingleFlat(id);
  }
}
