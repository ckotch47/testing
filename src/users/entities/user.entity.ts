import {Column, Entity, Index } from "typeorm";
import {BaseEntity} from "../../common/base.entity";

@Entity('users')
export class Users extends BaseEntity {
    @Column({ nullable: false, unique: true })
    public username: string;

    @Column()
    public password: string;

    @Index()
    @Column({ nullable: false, unique: true })
    public email: string;
}