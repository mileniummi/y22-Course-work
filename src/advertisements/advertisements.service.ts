import { Injectable, NotFoundException } from "@nestjs/common";
import { Between, Like, MoreThan, Repository } from "typeorm";
import { Advertisement, DealType } from "./entities/advertisement.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { SearchAdvertisementDto } from "./dto/search-advertisement.dto";
import { YandexStorageService } from "./yandex.storage.service";
import { paginate } from "nestjs-typeorm-paginate";

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>,
    private yandexStorageService: YandexStorageService
  ) {}

  async getAll(searchOptions: SearchAdvertisementDto, dealType: DealType, page, limit) {
    let advertisements;
    if (Object.keys(searchOptions).length > 2) {
      const query = this.advertisementsRepository.createQueryBuilder().where({
        dealType: searchOptions.dealType,
        dealObject: searchOptions.dealObject,
        price: Between(
          searchOptions.smallestPrice ? searchOptions.smallestPrice : 0,
          searchOptions.biggestPrice ? searchOptions.biggestPrice : Infinity
        ),
        roomCount: searchOptions.roomCount === 4 ? MoreThan(3) : searchOptions.roomCount,
        location: Like(`%${searchOptions.address}%`),
      });
      advertisements = await paginate(query, { page, limit });
      return {
        user: { login: "user" },
        totalPages: advertisements.meta.totalPages,
        currentPage: advertisements.meta.currentPage,
        advertisements: advertisements.items,
        amountOfRoomsText: searchOptions.roomCount ? searchOptions.roomCount + "-комнатную" : "",
        dealTypeText: searchOptions.dealType === DealType.SELL ? "Купить" : "Арендовать",
      };
    } else {
      advertisements = await paginate(this.advertisementsRepository.createQueryBuilder().where({ dealType }), {
        page,
        limit,
      });
      return {
        totalPages: advertisements.meta.totalPages,
        currentPage: advertisements.meta.currentPage,
        advertisements: advertisements.items,
        amountOfRoomsText: "",
        dealTypeText: "",
      };
    }
  }

  async getOne(id) {
    const advertisement = await this.advertisementsRepository.findOne({
      where: { id },
    });
    if (!advertisement) {
      throw new NotFoundException();
    }
    return {
      user: { login: "user" },
      adv: { ...advertisement },
    };
  }

  async create(advertisement: CreateAdvertisementDto, images: Array<Express.Multer.File>) {
    const imagesLinks = [];
    if (images && images.length > 0) {
      for (const image of images) {
        const imageLink = await this.yandexStorageService.save(image.buffer);
        if (imageLink) {
          imagesLinks.push(imageLink);
        }
      }
    } else {
      imagesLinks.push("/images/no_img_in_adv.jpeg");
    }
    await this.advertisementsRepository.save({
      ...advertisement,
      images: imagesLinks,
    });
  }
}
