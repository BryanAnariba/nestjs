/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus } from "@nestjs/common";
import { QueryFailedError } from "typeorm";

export const errorHandleExceptions = (error: any): HttpException => {
    if (error instanceof QueryFailedError && error.driverError.code === '23505') return new HttpException('Record already exists', HttpStatus.BAD_REQUEST);
    if (error instanceof HttpException) return error;
    return new HttpException(`Sometime went wrong: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
}