import { bcrypt } from 'bcrypt';

// Hashes passwords
export function hashPassword(password: string): string {
  const saltRounds = 10; // Number of salt rounds. Higher value means more secure but slower hashing
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}

// Checks if a entered password is the same as the hashed password
export function checkPassword(password: string, hashedPassword: string): boolean {
  const isMatch = bcrypt.compareSync(password, hashedPassword);
  return isMatch;
}
