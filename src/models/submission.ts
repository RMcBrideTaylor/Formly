import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity
} from 'typeorm'
import { Form } from './form'

@Entity()
export class Submission extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column('simple-json')
    options: object

    @ManyToOne( type => Form, form => form.permissions )
    form: Form

    // @TODO - Add timecodes
}