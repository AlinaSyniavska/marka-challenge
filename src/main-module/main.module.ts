import { Module } from '@nestjs/common';

import { MainService } from "./main.service";
import { MainController } from "./main.controller";
import { DatabaseService } from "../database-module/database.service";

@Module({
  controllers: [MainController],
  providers: [MainService, DatabaseService],
})
export class MainModule {}
