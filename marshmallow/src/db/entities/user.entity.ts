import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import Bot from './bot.entity'

export interface UserInsertPayload {
    email: string;
    name: string;
    bots: Bot[];
}

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id!: string

    @Column({
        unique: true
    })
    public email!: string;

    @Column()
    public name!: string;

    @Column({
        nullable: true
    })
    public lastLogin!: Date;

    @ManyToMany(() => Bot)
    @JoinTable()
    public bots?: Bot[];

    @CreateDateColumn()
    public createdAt!: Date

    @UpdateDateColumn()
    public updatedAt!: Date

    @DeleteDateColumn({
        nullable: true
    })
    public deletedAt?: Date
}
