import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from './app.module';
import { DatabaseService } from "./database-module/database.service";
import { ConfigService } from "@nestjs/config";
import { SocketIOAdapter } from "./socket-io-adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const configService = app.get(ConfigService);
  const clientPort = parseInt(configService.get('CLIENT_PORT'));

  app.enableCors({
    origin: [
      `http://localhost:${clientPort}`,
      new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
    ],
  });
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));


  const config = new DocumentBuilder()
    .setTitle('Marka Challenge')
    .setDescription('Marka Challenge API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const databaseService = app.get(DatabaseService);
  await databaseService.enableShutdownHooks(app)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
