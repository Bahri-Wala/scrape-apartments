/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appartment {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        name: 'title',
        nullable: false,
    })
    title: string;

    @Column({
        name: 'image',
        nullable: false,
    })
    image: string;
}