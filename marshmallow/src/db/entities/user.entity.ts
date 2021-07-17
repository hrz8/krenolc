import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import Bot from './bot.entity'

export interface UserInsertPayload {
    email: string;
    name: string;
    defaultBot: Bot;
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

    @OneToOne(() => Bot)
    @JoinColumn()
    public defaultBot?: Bot;

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
