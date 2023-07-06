import * as bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
    const randomSalt = await bcrypt.genSalt(12)
    return bcrypt.hash(password, randomSalt);
};