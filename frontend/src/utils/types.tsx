export type User = {
    fullName: string | null,
    email: string | null,
    userType: string | null,
    userImage: string | null,
    isVerified: boolean,
    isActive: boolean,
    isAuthenticated: boolean,
    accessToken: string | null,
}