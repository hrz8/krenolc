import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

export interface UserInsertPayload {
    email: string;
    name: string;
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

    @CreateDateColumn()
    public createdAt!: Date

    @UpdateDateColumn()
    public updatedAt!: Date

    @DeleteDateColumn({
        nullable: true
    })
    public deletedAt?: Date
}
