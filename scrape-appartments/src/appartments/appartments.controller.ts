/* eslint-disable prettier/prettier */
import { Controller, Res, Get, HttpStatus, Post, Body, Delete } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { AppartmentsService } from './appartments.service';
import { AppartmentDto } from './DTO/appartment.dto';

@Controller('appartments')
export class AppartmentsController {
    constructor(private readonly appartmentService: AppartmentsService) {}

    @Get("/scrape")
    async scrapeAppartments(@Res() response){
        const appartments = await this.appartmentService.scrape();
        return response.status(HttpStatus.OK).json({"appartments":appartments});
    }

    @Post()
    async saveAppartment(@Body() data:AppartmentDto[], @Res() response){
        try {
            const appartment = await this.appartmentService.saveToDb(data);
            return response.status(HttpStatus.OK).json({"appartment":appartment});
        } catch (error) {
            throw new NotAcceptableException({status:HttpStatus.NOT_ACCEPTABLE,error:"Missing data! payload not accepted!"});
        }
    }

    @Get()
    async findAll(@Res() response){
        const appartments = await this.appartmentService.getAll();
        return response.status(HttpStatus.OK).json(appartments);
    }

    @Delete()
    async emptyDb(@Res() response){
        await this.appartmentService.emptyDb()
        return response.status(HttpStatus.OK).json({message:"Databade content deleted successfully!"});
    }
}
