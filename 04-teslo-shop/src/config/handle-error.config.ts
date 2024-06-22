import { HttpException, HttpStatus } from "@nestjs/common";

export const handleErrors = (error: any, entity: string) => {
  if (error.code === '23505') throw new HttpException(`Duplicate ${entity} record.`, HttpStatus.BAD_REQUEST);
  if (error instanceof HttpException) throw error;
  throw new HttpException(`Sometime went wrong with ${entity} request: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
}