import {v4 as uuidV4} from 'uuid';

export class UUIDConfig {

  public static setUUID (): string {
    return uuidV4();
  }
}