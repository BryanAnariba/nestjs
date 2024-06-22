import { validate as isUUIDValue, v4 as uuid } from "uuid"

export class UUIDConfig {

  public static isUUID (uuid: string): boolean {
    return isUUIDValue(uuid);
  }

  public static get genUUID (): string {
    return uuid();
  }
}