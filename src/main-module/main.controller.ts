import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { MainService } from "./main.service";
import { ArrayDto } from "./dto/array.dto";

@ApiTags('Main')
@Controller('api/main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('/simpleResponse')
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

  @Post('/sortedArray')
  @ApiBody({type: ArrayDto})
  @ApiOperation({summary: "Return a JSON object with an array of 1000 integers sorted in ascending order."})
  @ApiOkResponse()
  @ApiBadRequestResponse({description: 'Bad Request'})
  create(@Body() arrayDto: ArrayDto) {
    return this.mainService.sortArray(arrayDto);
  }

}
