import { Controller, Get, Param, Render } from "@nestjs/common";
import advArray from "../data/advertisementsArray";

@Controller("advertisements")
export class AdvertisementsController {
  @Get("/")
  @Render("pages/flats_list")
  getFlatList() {
    return { flat1: advArray[0], flat2: advArray[1] };
  }

  @Get("/:id")
  @Render("pages/flat_page")
  getOneFlat(@Param("id") id: string) {
    const a = advArray.find((adv) => adv.id === id);
    return { adv: a };
  }
}
