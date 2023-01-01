/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class AppartmentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image: string;
}