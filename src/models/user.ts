import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, Index} from "typeorm";
import {Account} from "./account";
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    username : string;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @ManyToOne(type => Account, account => account.users)
    account: Account;

    validPassword(password : string) {
      return bcrypt.compareSync(password, this.password);
    }
}
