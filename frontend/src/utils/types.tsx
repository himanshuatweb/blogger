export type User = {
    fullName: string | null,
    email: string | null,
    userType: string | null,
    userImage: string | null,
    isVerified: boolean,
    isActive: boolean,
    isAuthenticated: boolean,
}

export type Token = {
    accessToken: string | null;
    refreshToken: string | null;
}

export type LoginResponse = {
    statusCode: number;
    data: {
        user: {
            fullName: string;
            email: string;
            age: number;
            userImage: string;
            isActive: boolean;
            isVerified: boolean;
            userType: string;
            refreshToken: string;
        };
        accessToken: string;
    };
    message: string;
    success: boolean;
}

export type LogoutResponse = {
    statusCode: number;
    message: string;
    success: boolean;
    data: Record<string, unknown>; // Empty object (use Record<string, unknown> for flexibility)
}