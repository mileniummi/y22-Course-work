import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: "cat", description: "Username of user" })
  username: string;

  @IsString()
  @ApiProperty({ example: "Nikolay", description: "Name of user" })
  firstName?: string;

  @IsString()
  @ApiProperty({ example: "Andreev", description: "Surname of user" })
  lastName?: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: "querty123", description: "Password of user" })
  password: string;
}
