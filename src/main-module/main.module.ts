import { Module } from '@nestjs/common';

import { MainService } from "./main.service";
import { MainController } from "./main.controller";
import { DatabaseService } from "../database-module/database.service";
import { AzureBlobStorageService } from "../azure-blob-storage-module/azure-blob-storage.service";

@Module({
  controllers: [MainController],
  providers: [MainService, DatabaseService, AzureBlobStorageService],
})
export class MainModule {}
