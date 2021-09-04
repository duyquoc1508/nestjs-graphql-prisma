import { compare, hash } from 'bcrypt';

export class AuthHelper {
  static validate(password: string, hashPassword: string): Promise<boolean> {
    return compare(password, hashPassword);
  }

  static hash(password: string): Promise<string> {
    return hash(password, 10);
  }
}
