import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { databaseImage } from "./entities/databaseImage.entity";

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>,
    @InjectRepository(databaseImage)
    private databaseImageRepository: Repository<databaseImage>
  ) {}
  async getFlatList() {
    const advertisements = await this.advertisementsRepository.find({
      relations: ["images"],
    });
    const flatList = [];
    for (const advertisement of advertisements) {
      const imagesBase64 = advertisement.images.map(
        (image) =>
          `data:${image.mimetype};base64,${Buffer.from(image.data).toString(
            "base64"
          )}`
      );
      flatList.push({ ...advertisement, photos: imagesBase64 });
    }
    return { user: { login: "user" }, advertisements: flatList };
  }

  async getSingleFlat(id) {
    const advertisement = await this.advertisementsRepository.findOne({
      where: { id },
      relations: ["images"],
    });
    const imagesBase64 = advertisement.images.map(
      (image) =>
        `data:${image.mimetype};base64,${Buffer.from(image.data).toString(
          "base64"
        )}`
    );
    return {
      user: { login: "user" },
      adv: { ...advertisement, photos: imagesBase64 },
    };
  }
}
