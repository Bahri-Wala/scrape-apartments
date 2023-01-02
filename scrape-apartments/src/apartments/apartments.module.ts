/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { HttpModule } from '@nestjs/axios'
import { Apartment } from './Entity/apartment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartment]),
    HttpModule
  ],
  controllers: [ApartmentsController],
  providers: [ApartmentsService]
})
export class ApartmentsModule {}
