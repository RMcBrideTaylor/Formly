import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity
} from 'typeorm'
import { Form } from './form'

@Entity()
export class Input extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('simple-json')
    options: object

    @ManyToOne( type => Form, form => form.inputs)
    form: Form
}