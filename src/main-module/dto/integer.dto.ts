import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, Min } from "class-validator";

export class IntegerDto {
  @IsInt()
  @Min(1)
  @Max(20)
  @ApiProperty({
    description: "An integer n (where 1 ≤ n ≤ 20)",
    default: 1,
  })
  public n: number;
}
