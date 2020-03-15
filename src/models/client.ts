import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity()
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name : string

    @Column()
    secret: string

    @Column()
    description: string

    @Column()
    callback: string

}
