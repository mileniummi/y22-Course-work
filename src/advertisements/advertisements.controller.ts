import { Controller, Get, Param, Render } from "@nestjs/common";
import advArray from "../data/advertisementsArray";

@Controller("advertisements")
export class AdvertisementsController {
  @Get("/")
  @Render("pages/flats_list")
  getFlatList() {
    return { user: { login: "user" }, advertisements: advArray };
  }

  @Get("/:id")
  @Render("pages/flat_page")
  getOneFlat(@Param("id") id: string) {
    return {
      user: { login: "user" },
      adv: advArray.find((adv) => adv.id === id),
    };
  }
}
