import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToMany
} from 'typeorm'
import { User } from './user'
import { Group } from './group'

@Entity()
export class Account extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(type => User, user => user.account)
  users: User[]

  @ManyToMany( type => Group, group => group.members)
  groups : Group[]

}
