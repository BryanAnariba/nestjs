import { UUIDConfig } from "src/config";

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function): void => {
  // console.log({file})

  if (!file) return callback(new Error('File is empty'), false);

  const fileExtention = file.mimetype.split('/')[1];

  const fileName = `${UUIDConfig.genUUID}.${fileExtention}`

  return callback(null, fileName);
}