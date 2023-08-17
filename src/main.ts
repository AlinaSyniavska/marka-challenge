import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from './app.module';
import { DatabaseService } from "./database-module/database.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Marka Challenge')
    .setDescription('Marka Challenge API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const databaseService = app.get(DatabaseService);
  await databaseService.enableShutdownHooks(app)

  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
