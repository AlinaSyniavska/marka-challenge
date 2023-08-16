import { Controller, Get, Post, Body, HttpCode } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { MainService } from "./main.service";
import { ArrayDto } from "./dto/array.dto";
import { IntegerDto } from "./dto/integer.dto";
import { TextDto } from "./dto/text.dto";

@ApiTags('Main')
@Controller('api/main')
export class MainController {
  constructor(private readonly mainService: MainService) {
  }

  @Get('/simpleResponse')
  @ApiOperation({ summary: 'Return a JSON object with 1 text field \'The challenge accepted!!!\'' })
  @ApiOkResponse( {
    schema: {
      example:
        {
          "data": "The challenge accepted!!!"
        }
    }
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  getSimpleResponse() {
    return {
      data: 'The challenge accepted!!!'
    };
  }

  @Post('/sortArray')
  @ApiBody({ type: ArrayDto })
  @ApiOperation({ summary: 'Return a JSON object with an array of 1000 integers sorted in ascending order.' })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'Bad Request' })
  sortArray(@Body() arrayDto: ArrayDto) {
    return this.mainService.sortArray(arrayDto);
  }

  @Post('/factorial')
  @ApiBody({ type: IntegerDto })
  @ApiOperation({ summary: 'Calculate the factorial of a given number.' })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'Bad Request' })
  calculateFactorial(@Body() integerDto: IntegerDto) {
    return this.mainService.calculateFactorial(integerDto);
  }

  @Post('/reverseSentence')
  @ApiBody({ type: TextDto })
  @ApiOperation({ summary: 'Return a string where every word of an input sentence is reversed but the sentence order remains the same.' })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'Bad Request' })
  reverseSentence(@Body() textDto: TextDto) {
    return this.mainService.reverseSentence(textDto);
  }

}
