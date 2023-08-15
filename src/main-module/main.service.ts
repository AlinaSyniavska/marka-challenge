import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { ArrayDto } from "./dto/array.dto";

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
}
