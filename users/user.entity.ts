import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";
import "reflect-metadata";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false }) // Excludes password from queries
    passwordHash!: string;

    @Column()
    title!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    role?: string;

    private _password!: string; 

    set password(password: string) {
        this._password = password;
    }

    get password(): string {
        return this._password;
    }

    @BeforeInsert()
    async hashPassword() {
        if (this._password) {
            this.passwordHash = await bcrypt.hash(this._password, 10);
        }
    }
}