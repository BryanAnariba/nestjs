export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function): void => {
  // console.log({file})

  if (!file) return callback(new Error('File is empty'), false);

  const fileExtention = file.mimetype.split('/')[1];

  const validExtentions = ['jpg','jpeg', 'png', 'gif'];

  if (!validExtentions.includes(fileExtention)) return callback(new Error('Invalid image extention'), false);

  return callback(null, true);
}