import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  Index
} from 'typeorm'

import { Group } from "./group";

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne( type => Group, group => group.permissions )
  group : Group
}
