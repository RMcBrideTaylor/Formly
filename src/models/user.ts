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

    async validPassword(password : string) {
      return await bcrypt.compare(password, this.password);
    }
}
