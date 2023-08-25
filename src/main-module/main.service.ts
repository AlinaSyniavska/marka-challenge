import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database-module/database.service";
import { Products } from "@prisma/client";

import { ArrayDto } from "./dto/array.dto";
import { IntegerDto } from "./dto/integer.dto";
import { TextDto } from "./dto/text.dto";
import { AzureBlobStorageService } from "../azure-blob-storage-module/azure-blob-storage.service";

@Injectable()
export class MainService {

  constructor(
    private databaseService: DatabaseService,
    private storageService: AzureBlobStorageService,
    ) {}

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
          start = 0;
        }
        if (!rangeEnd) {
          end = 1000;
        }

        if (!Number.isInteger(start) || !Number.isInteger(end)) {
          throw new HttpException("Some range is not valid", HttpStatus.BAD_REQUEST);
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
          }
          // take: 5,
        });
      } else {
        return this.databaseService.products.findMany();
      }
    } catch (error) {
      throw new BadRequestException({ message: error.response, statusCode: error.status });
    }
  }

  async getByProductId(id: number): Promise<Products | HttpException> {
    const data = await this.databaseService.products.findFirst({
      where: { id: id }
    });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  async readTextFile(filename: string = 'azureText.txt'): Promise<any | HttpException> {
    try {
      return  this.storageService.getFileStream(filename);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async calculateFactorial(data: IntegerDto): Promise<number | HttpException> {
    let answer: number = 1;

    for (let i = data.n; i >= 1; i--) {
      answer = answer * i;
    }
    return answer;
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

  async generateFibonacci(n: number): Promise<number[] | HttpException> {
    try {
      if (n > 1024) {
        throw new HttpException(`An integer n (first n Fibonacci numbers) - ${n} should not cause a server crash`, HttpStatus.BAD_REQUEST);
      }
      // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
      if (n == 0) {
        return [0];
      } else if (n == 1) {
        return [1];
      } else {
        let a = 1, b = 0, temp;
        const result = [0];

        while (n > 1) {
          temp = a;
          a = a + b;
          b = temp;
          result.push(b);
          n--;
        }

        return result;
      }
    } catch (error) {
      throw new BadRequestException({ message: error.response, statusCode: error.status });
    }
  }

  async makeApiCalls(): Promise<any | HttpException> {
    const response: any = {};

    await Promise.allSettled([
      fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => response.json()),
      fetch("https://jsonplaceholder.typicode.com/users/1")
        .then((response) => response.json()),
      fetch("https://no-such-url")
        .then((response) => response.json()),
      fetch("https://picsum.photos/500/700")
        .then((response) => response.url),
      fetch("https://catfact.ninja/fact")
        .then((response) => response.json())
    ])
      .then(results => {
        results.forEach((result, index) => {
          // console.log(result);
          response[index] = Object.assign(result);
        });
      })
      .catch((err) => console.log(err))
      // .finally(() => console.log(response))
      .finally()
    ;

    return response;
  }
}
