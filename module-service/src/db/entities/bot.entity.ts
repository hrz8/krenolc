import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

export interface BotModules {
    [moduleId: string]: {
        enabled: boolean;
        settings: {
            [other: string]: any;
        };
    };
}

export interface BotMetadata {
    node: {
        [nodeId: string]: {
            content: {
                text: string | string[];
                buttons?: any[];
                quickReplies?: any[];
            };
            options?: any;
        };
    };
    trigger: {
        [triggerId: string]: {
            pattern: string;
            event: string;
            data?: Record<string, any> | string;
            context?: string;
            priority?: number;
        };
    };
}

export interface BotInsertPayload {
    id?: string;
    name: string;
    modules?: BotModules;
    metadata?: BotMetadata;
}

@Entity()
export default class Bot extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id!: string

    @Column({
        unique: true
    })
    public name!: string;

    @Column('simple-json')
    public modules!: BotModules

    @Column('simple-json')
    public metadata!: BotMetadata

    @CreateDateColumn()
    public createdAt!: Date

    @UpdateDateColumn()
    public updatedAt!: Date

    @DeleteDateColumn({
        nullable: true
    })
    public deletedAt?: Date
}
