import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity} from "typeorm";

@Entity
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => User, user => user.account)
  users: User[]

}
