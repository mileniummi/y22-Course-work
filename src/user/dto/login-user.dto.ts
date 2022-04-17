import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class LoginUserDto {
  @IsString()
  @ApiProperty({ example: "cat", description: "Username of user" })
  username: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: "querty123", description: "Password of user" })
  password: string;
}
