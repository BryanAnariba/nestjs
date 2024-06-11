import * as bcrypt from 'bcrypt';

export class Bcrypt {
  public static encryptPassword (password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  public static verifyPassword (password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}