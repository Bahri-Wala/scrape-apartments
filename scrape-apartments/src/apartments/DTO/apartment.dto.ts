/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class ApartmentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image: string;
}