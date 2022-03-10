import { Controller, Get, Param, Render } from "@nestjs/common";
import advArray from "../data/advertisementsArray";

@Controller("advertisements")
export class AdvertisementsController {
  @Get("/")
  @Render("pages/flats_list")
  getFlatList() {
    return { user: { login: "name" }, advArray };
  }

  @Get("/:id")
  @Render("pages/flat_page")
  getOneFlat(@Param("id") id: string) {
    const a = advArray.find((adv) => adv.id === id);
    return { user: { login: "name" }, adv: a };
  }
}
