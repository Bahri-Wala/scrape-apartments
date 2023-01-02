/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import puppeteer from 'puppeteer';
import { from } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { ApartmentDto } from './DTO/apartment.dto';
import { Apartment } from './Entity/apartment.entity'

@Injectable()
export class ApartmentsService {
    constructor(
        @InjectRepository(Apartment) private apartmentRepository: Repository<Apartment>, 
    ) {}

    public async scrape() {
        let pageCounter = 1;
        let apartments = [];
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions']
        });
        const page = await browser.newPage();
        while (pageCounter <= 25) {
            const URL = "https://www.sreality.cz/en/search/for-sale/apartments/all-countries?page=" + pageCounter;
            await page.goto(URL, {
                waitUntil: 'networkidle2',
            });
            const results = await page.evaluate(() => {
                const propertyList = [];

                document
                    .querySelectorAll('.property')
                    .forEach((z) => {
                        // const tempImgList = [];

                        // z.querySelectorAll(
                        //   '[data=i] a:first-child img',
                        // ).forEach((x) => {
                        //   if (x.querySelector('img').src)
                        //     tempImgList.push(x.querySelector('img').src);
                        // });
                        const data = {
                            title: z.querySelector('.title > .name')?.textContent,
                            image: z.querySelector('[data=i] a:first-child img').getAttribute('src'),
                        };

                        propertyList.push(data);
                    });

                return propertyList;
            });
            apartments = apartments.concat(results)
            pageCounter++;
        }
        await browser.close();
        await this.emptyDb();
        await this.saveToDb(apartments)
        return apartments;
    }

    async saveToDb(apartments:ApartmentDto[]){
        return await this.apartmentRepository.save(apartments);
    }

    async getAll(){
        return await this.apartmentRepository.find();
    }

    async emptyDb(){
        return await this.apartmentRepository.delete({});
    }
}
