/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import puppeteer from 'puppeteer';
import { from } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { AppartmentDto } from './DTO/appartment.dto';
import { Appartment } from './Entity/appartment.entity'

@Injectable()
export class AppartmentsService {
    constructor(
        @InjectRepository(Appartment) private appartmentRepository: Repository<Appartment>, 
        // private datasource : DataSource
    ) {}

    public async scrape() {
        let pageCounter = 1;
        let appartments = [];
        const browser = await puppeteer.launch({
            headless: false,
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
            appartments = appartments.concat(results)
            pageCounter++;
        }
        await browser.close();
        await this.emptyDb();
        await this.saveToDb(appartments)
        return appartments;
    }

    async saveToDb(appartments:AppartmentDto[]){
        return await this.appartmentRepository.save(appartments);
    }

    async getAll(){
        return await this.appartmentRepository.find();
    }

    async emptyDb(){
        return await this.appartmentRepository.delete({});
    }
}
