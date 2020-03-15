import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm'

import { Account } from './account'
import { Permission } from './permission'

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany( type => Account, account => account.groups )
  @JoinTable()
  members: Account[]

  @OneToMany( type => Permission, permission => permission.group )
  permissions: Permission[]

}
