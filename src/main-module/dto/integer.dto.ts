import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";
import { Transform } from 'class-transformer';

export class IntegerDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(20)
  @ApiProperty({
    description: 'An integer n (where 1 ≤ n ≤ 20)',
    default: 1,
  })
  public n: number;
}
