import { hash, compare } from "bcryptjs";

// utility function for hashing user passwords
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

// utility function for comparing user input to stored password during authentication
export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
