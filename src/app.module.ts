import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from "./main-module/main.module";

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV}`
  }), MainModule,
    MainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
