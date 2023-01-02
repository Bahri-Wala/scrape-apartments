/* eslint-disable prettier/prettier */
import { Controller, Res, Get, HttpStatus, Post, Body, Delete } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { ApartmentsService } from './apartments.service';
import { ApartmentDto } from './DTO/apartment.dto';

@Controller('apartments')
export class ApartmentsController {
    constructor(private readonly apartmentService: ApartmentsService) {}

    @Get("/scrape")
    async scrapeApartments(@Res() response){
        const apartments = await this.apartmentService.scrape();
        return response.status(HttpStatus.OK).json({"apartments":apartments});
    }

    @Post()
    async saveApartment(@Body() data:ApartmentDto[], @Res() response){
        try {
            const apartment = await this.apartmentService.saveToDb(data);
            return response.status(HttpStatus.OK).json({"apartment":apartment});
        } catch (error) {
            throw new NotAcceptableException({status:HttpStatus.NOT_ACCEPTABLE,error:"Missing data! payload not accepted!"});
        }
    }

    @Get()
    async findAll(@Res() response){
        const apartments = await this.apartmentService.getAll();
        return response.status(HttpStatus.OK).json(apartments);
    }

    @Delete()
    async emptyDb(@Res() response){
        await this.apartmentService.emptyDb()
        return response.status(HttpStatus.OK).json({message:"Databade content deleted successfully!"});
    }
}
