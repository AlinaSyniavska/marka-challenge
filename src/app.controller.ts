import { Controller, Get, HttpCode } from "@nestjs/common";
import { AppService } from './app.service';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getOk() {  }
}
