import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @Index({ unique: true })
    @Column()
    name : string;

    @Column()
    secret: string;

    @Column()
    description: string;

    @Column()
    callback: string;
    
}
