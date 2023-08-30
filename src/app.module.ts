import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { APP_INTERCEPTOR } from '@nestjs/core';

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
    MainModule, DatabaseModule, AzureBlobStorageModule,
    CacheModule.register({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
})
export class AppModule {}
