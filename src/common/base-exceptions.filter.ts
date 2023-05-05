import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

export abstract class BaseExceptionsFilter<T> implements ExceptionFilter {
  protected constructor(
    protected readonly httpAdapterHost: HttpAdapterHost,
    protected readonly configService: ConfigService,
  ) {}

  public abstract catch(exception: T, host: ArgumentsHost): void;

  protected getContext(host: ArgumentsHost): HttpArgumentsHost {
    return host.switchToHttp();
  }

  protected get adapter(): AbstractHttpAdapter {
    const { httpAdapter } = this.httpAdapterHost;
    return httpAdapter;
  }

  protected get isDev(): boolean {
    return this.configService.get('ENV') === 'development';
  }
}
