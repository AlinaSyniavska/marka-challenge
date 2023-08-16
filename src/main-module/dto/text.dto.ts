import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TextDto {
  @IsString()
  @ApiProperty({
    description: 'A sentence',
    default: 'Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications.',
  })
  public sentence: string;
}