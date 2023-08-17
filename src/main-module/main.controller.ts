import { Controller, Get, Post, Body, HttpCode, Query, Header, Param, ParseIntPipe } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody, ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";

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
  sortArray(@Body() array: any) {
    return this.mainService.sortArray(array);
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

  @Get('/data/:id')
  @ApiOperation({summary: "Fetch and return data from a SQL database by ID."})
  @ApiParam({name: 'id'})
  @ApiOkResponse({
    schema: {
      example: {
        "id": 1,
        "productName": "Chicken",
        "productPrice": 202,
        "productDescription": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      },
    }
  })
  @ApiNotFoundResponse({description: 'Not Found'})
  getByProductId(@Param('id', ParseIntPipe) id: number) {
    return this.mainService.getByProductId(id);
  }

  @Get('readTextFile')
  @ApiOperation({summary: 'Read and return the content of a text file from Azure blob storage.'})
  @ApiQuery({name: 'filename', required: false, description: 'File identifier or name'})
  @Header('Content-Type','text/html')
  async readTextFile(@Query('filename') filename){
    return this.mainService.readTextFile(filename);
  }

  @Get('/factorial')
  @ApiOperation({ summary: 'Calculate the factorial of a given number.' })
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  calculateFactorial(@Query() param: IntegerDto) {
    return this.mainService.calculateFactorial(param);
  }

  @Post('/reverseSentence')
  @ApiBody({ type: TextDto })
  @ApiOperation({ summary: 'Return a string where every word of an input sentence is reversed but the sentence order remains the same.' })
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'Bad Request' })
  reverseSentence(@Body() textDto: TextDto) {
    return this.mainService.reverseSentence(textDto);
  }

  @Get('/fibonacci')
  @ApiOperation({ summary: 'Generate and return a sequence of the first n Fibonacci numbers.' })
  @ApiOkResponse()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  generateFibonacci(@Query('n', ParseIntPipe) n: number) {
    return this.mainService.generateFibonacci(n);
  }

  @Get('/apiCalls')
  @ApiOperation({summary: 'Simultaneously make five external API calls, wait for all to complete, and return the aggregated data.'})
  @ApiOkResponse()
  makeApiCalls() {
    return this.mainService.makeApiCalls();
  }

}
