import * as bcrypt from "bcrypt";

export class Bcrypt {

  public static genEncryptedThing (thing: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(thing, salt);
  }

  public static compareThings (thing: string, encryptedThing: string): boolean {
    return bcrypt.compareSync(thing, encryptedThing);
  }
}