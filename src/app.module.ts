import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from "./main-module/main.module";
import { DatabaseModule } from "./database-module/database.module";
import { DatabaseService } from "./database-module/database.service";
import { AzureBlobStorageModule } from "./azure-blob-storage-module/azure-blob-storage.module";

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV}`
  }),
    MainModule, DatabaseModule, AzureBlobStorageModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
