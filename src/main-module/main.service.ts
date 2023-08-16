import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { ArrayDto } from "./dto/array.dto";
import { IntegerDto } from "./dto/integer.dto";
import { TextDto } from "./dto/text.dto";

@Injectable()
export class MainService {
  async sortArray(data: ArrayDto): Promise<ArrayDto | HttpException> {
    try {
      data.integers.sort((a, b) => a - b)

      return {
        integers: data.integers,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async calculateFactorial(data: IntegerDto): Promise<number | HttpException> {
    try {
      let answer = 1;
      if (data.n === 1){
        return answer;
      }
      else if(data.n > 1){
        for(let i = data.n; i >= 1; i--){
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
      const reverseSentence = data.sentence.split(' ').map(item => item.split('').reverse().join('')).join(' ');

      return {
        sentence: reverseSentence,
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

}
