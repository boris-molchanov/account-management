import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

function generateAccessToken(user) {
    return jwt.sign({ userId: user.id }, 
        process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1h',
    });
}

function generateRefreshToken(user: User, jti: string) {
    return jwt.sign({
        userId: user.id,
        jti
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '8h',
    });
}

export const generateTokens = (user: User, jti: string) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken,
    };
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
};

