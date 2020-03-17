import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity
} from 'typeorm'

import { Permission } from './permission'
import { Submission } from './submission'
import { Input } from './input'

@Entity()
export class Form extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany( type => Input, input => input.form)
    inputs: Input[]

    @OneToMany( type => Permission, permission => permission.form )
    permissions: Permission[]

    @OneToMany( type => Submission, submission => submission.form )
    submissions: Submission[]
}