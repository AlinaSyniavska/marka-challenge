import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DatabaseService } from "../database-module/database.service";
import { Products } from "@prisma/client";

import { ArrayDto } from "./dto/array.dto";
import { IntegerDto } from "./dto/integer.dto";
import { TextDto } from "./dto/text.dto";

@Injectable()
export class MainService {

  constructor(private databaseService: DatabaseService) {
  }

  async sortArray(data: ArrayDto): Promise<ArrayDto | HttpException> {
    try {
      data.integers.sort((a, b) => a - b);

      return {
        integers: data.integers
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getData(rangeStart: string, rangeEnd: string): Promise<Products[] | HttpException> {
    try {
      if (rangeStart || rangeEnd) {
        let start: number = Number(rangeStart);
        let end: number = Number(rangeEnd);

        if (!rangeStart) {
          start = 1;
        }
        if (!rangeEnd) {
          end = 1000;
        }

        if (!Number.isInteger(start) || !Number.isInteger(end)){
          throw new HttpException('Some range is not valid', HttpStatus.BAD_REQUEST);
        }

        return this.databaseService.products.findMany({
          where: {
            AND: [
              {
                productPrice: {
                  gte: start
                }
              },
              {
                productPrice: {
                  lte: end
                }
              }
            ]
          },
          // take: 5,
        });
      } else {
        return this.databaseService.products.findMany();
      }
    } catch (error) {
      throw new BadRequestException({message: error.response, statusCode: error.status});
    }
  }

  async readTextFile(filename: string): Promise<string | HttpException> {
    try {


        return filename;

    } catch (error) {
      // throw new BadRequestException({message: error.response, statusCode: error.status});
      throw new BadRequestException();
    }
  }

  async calculateFactorial(data: IntegerDto): Promise<number | HttpException> {
    try {
      let answer = 1;
      if (data.n === 1) {
        return answer;
      } else if (data.n > 1) {
        for (let i = data.n; i >= 1; i--) {
          answer = answer * i;
        }
        return answer;
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async reverseSentence(data: TextDto): Promise<TextDto | HttpException> {
    try {
      const reverseSentence = data.sentence.split(" ").map(item => item.split("").reverse().join("")).join(" ");

      return {
        sentence: reverseSentence
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

}
