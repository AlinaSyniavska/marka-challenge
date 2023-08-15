import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { MainModuleModule } from './main-module/main-module.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV}`
  }), MainModuleModule,
    // MainModule],
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
