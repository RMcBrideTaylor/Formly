import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";
import {User} from "./user";

@Entity()
export class Account extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  // @TODO - Roles

  @OneToMany(type => User, user => user.account)
  users: User[];

}
