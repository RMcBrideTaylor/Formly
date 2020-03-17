import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, Index } from 'typeorm'

import { Group } from './group'
import { Form } from './form'

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne( type => Group, group => group.permissions )
  group : Group

  @ManyToOne( type => Form, form => form.permissions)
  form: Form
}
