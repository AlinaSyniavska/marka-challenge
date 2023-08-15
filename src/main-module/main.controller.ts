import { Controller, Get, Post, Body } from '@nestjs/common';

import { MainService } from "./main.service";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Main')
@Controller('api/main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('/simple_response')
  @ApiOperation({summary: "Return a JSON object with 1 text field 'The challenge accepted!!!'"})
  @ApiOkResponse({
    schema: {
      example:
          {
            "data": 'The challenge accepted!!!',
          },
    }
  })
  @ApiBadRequestResponse({description: 'Bad Request'})
  async getSimpleResponse() {
    return {
      data: 'The challenge accepted!!!',
    };
  }

/*  @Post()
  create(@Body() createMainModuleDto: CreateMainModuleDto) {
    return this.mainModuleService.create(createMainModuleDto);
  }

  @Get()
  findAll() {
    return this.mainModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainModuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainModuleDto: UpdateMainModuleDto) {
    return this.mainModuleService.update(+id, updateMainModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainModuleService.remove(+id);
  }*/
}
