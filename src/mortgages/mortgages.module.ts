import { Module } from "@nestjs/common";
import { MortgagesController } from "./mortgages.controller";

@Module({
  controllers: [MortgagesController],
})
export class MortgagesModule {}
