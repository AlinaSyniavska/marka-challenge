import { Controller, Get, Post, Body, HttpCode, Query, Header } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

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

  @Get('/data')
  @ApiOperation({summary: 'Fetch and return data from a SQL database with at least 10,000 records.'})
  @ApiQuery({name: 'rangeStart', required: false, description: 'Lower price range'})
  @ApiQuery({name: 'rangeEnd', required: false, description: 'Upper price range'})
  @ApiOkResponse({
    schema: {
      example:
        [
          {
            "id": 1,
            "productName": "Chicken",
            "productPrice": 202,
            "productDescription": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
          },
          {
            "id": 2,
            "productName": "Shirt",
            "productPrice": 419,
            "productDescription": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
          }
        ]
    }
  })
  @ApiBadRequestResponse({description: 'Bad Request'})
  async getData(@Query('rangeStart') rangeStart: string, @Query('rangeEnd') rangeEnd: string) {
    return this.mainService.getData(rangeStart, rangeEnd);
  }

  @Get('readTextFile')
  @ApiOperation({summary: 'Read and return the content of a text file from Azure blob storage.'})
  @ApiQuery({name: 'filename', required: false, description: 'File identifier or name'})
  @Header('Content-Type','text/html')
  async readTextFile(@Query('filename') filename){
    return this.mainService.readTextFile(filename);
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
