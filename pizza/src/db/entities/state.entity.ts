import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import Session from './session.entity'

export interface StateMetadata {
    context: string
}

Entity()
export default class State extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @OneToOne(() => Session)
    @JoinColumn()
    session!: Session;

    @Column()
    channel!: string;

    @Column('simple-json')
    metadata!: StateMetadata

    @Column('simple-json')
    vars!: Record<string, any>

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt?: Date
}
