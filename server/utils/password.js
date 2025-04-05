import bcrypt from 'bcryptjs';

export const verifyPassword = async (enteredPassword, storedHashedPassword) => {
  return await bcrypt.compare(enteredPassword, storedHashedPassword);
};
