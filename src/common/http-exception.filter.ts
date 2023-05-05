import {
    ArgumentsHost,
    Catch,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { isString } from 'class-validator';

import { ExceptionInterface} from "./exception.interface";
import { isObject } from "./types";
import { BaseExceptionsFilter } from './base-exceptions.filter';

@Catch()
export class AllExceptionsFilter extends BaseExceptionsFilter<unknown> {
    public constructor(
        httpAdapterHost: HttpAdapterHost,
        configService: ConfigService,
    ) {
        super(httpAdapterHost, configService);
    }

    public catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = this.getContext(host);
        const statusCode = this.getStatusCode(exception);
        const message = this.getMessage(exception);
        const location = this.getLocation(exception, ctx);
        const error = this.getError(exception);
        const stack = this.getStack(exception);
        const rest = this.getRest(exception);

        if (
            !this.isHttpError(exception) ||
            statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ) {
            Logger.error(message, stack, location);
        }

        const responseBody: ExceptionInterface = {
            statusCode,
            message,
            error,
            ...rest,
        };

        this.adapter.reply(ctx.getResponse(), responseBody, statusCode);
    }

    private getStatusCode(exception: unknown): HttpStatus {
        if (this.isHttpError(exception)) {
            return exception.getStatus();
        }

        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    private getMessage(exception: unknown): string {
        if (this.isError(exception) && exception.message.length) {
            return exception.message;
        }

        return 'An unexpected error occurred';
    }

    private getLocation(exception: unknown, ctx: HttpArgumentsHost): string {
        const path = this.adapter.getRequestUrl(ctx.getRequest()) ?? null;

        if (this.isHttpError(exception)) {
            return path;
        }

        if (this.isError(exception)) {
            const location =
                exception.stack &&
                exception.stack.match(/\w+(service|client|controller)(impl)?\.\w+/i);
            const context = Array.isArray(location)
                ? location[0]
                : location
                    ? `${location}`
                    : null;
            return context ?? path;
        }

        return path ?? 'unknown';
    }

    private getError(exception: unknown): string {
        if (this.isError(exception)) {
            return exception.name;
        }

        return 'Error';
    }

    private getStack(exception: unknown): string {

        if (this.isTypeError(exception) && this.isDev) {
            return exception.stack ?? '';
        }

        return '';
    }

    private getRest(
        exception: unknown,
    ): Partial<Pick<ExceptionInterface, 'error'>> {
        if (this.isHttpError(exception)) {
            const rest = exception.getResponse();
            return !isString(rest) ? rest : {};
        }

        return {};
    }

    private isHttpError(exception: unknown): exception is HttpException {
        return exception instanceof HttpException;
    }

    private isTypeError(exception: unknown): exception is TypeError {
        return exception instanceof TypeError;
    }



    private isError(exception: unknown): exception is Error {
        return exception instanceof Error;
    }
}
