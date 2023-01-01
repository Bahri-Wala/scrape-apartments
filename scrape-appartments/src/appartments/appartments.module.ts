/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestCrawlerModule } from 'nest-crawler';
import { AppartmentsController } from './appartments.controller';
import { AppartmentsService } from './appartments.service';
import { HttpModule } from '@nestjs/axios'
import { Appartment } from './Entity/appartment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appartment]),
    HttpModule,
    NestCrawlerModule
  ],
  controllers: [AppartmentsController],
  providers: [AppartmentsService]
})
export class AppartmentsModule {}
