import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import {Account} from "./account";

@Entity()
export class Cache extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key : string;

    @Column('json')
    value: string;

    @Column()
    expires: Date;

    @ManyToOne(type => Account, account => account.users)
    account: Account;
}
