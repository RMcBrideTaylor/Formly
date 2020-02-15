import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import {User} from "./user";

@Entity
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToOne(type => Account, account => account.users)
    account: Account
}
