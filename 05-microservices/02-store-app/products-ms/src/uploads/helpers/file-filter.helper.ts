import { HttpException, HttpStatus } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file)
    return callback(
      new HttpException(`The file is required`, HttpStatus.BAD_REQUEST),
      false,
    );

  const fileExtention = file.mimetype.split('/').pop();
  // console.log({fileExtention});
  const validExtentions: string[] = ['png', 'jpge', 'gif', 'jpg', 'jpeg'];

  if (!validExtentions.includes(fileExtention))
    return callback(
      new HttpException(
        `Not valid format to image, only accepts: ${validExtentions.join(',')}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );

  return callback(null, true);
};
