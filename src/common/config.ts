import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';

export class Config{
    private config: ConfigService;
    public constructor() {
        this.config = new ConfigService();
    }
    public get<T = any>(propertyPath: string, defaultValue?: T) {
        return this.config.get(propertyPath, defaultValue);
    }

    public getDatabaseOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.get('TYPEORM_HOST'),
            port: this.get('TYPEORM_PORT'),
            username: this.get('TYPEORM_USERNAME'),
            password: this.get('TYPEORM_PASSWORD'),
            database: this.get('TYPEORM_DATABASE'),
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
        };
    }


}
export const config = new Config();