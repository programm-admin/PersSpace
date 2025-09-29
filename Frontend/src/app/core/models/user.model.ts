export type M_User = {
    userName: string;
    image: string;
    id: string;
};

export type M_Credentials = {
    refreshToken: string;
    accessToken: string;
};

export type M_UserLoginResponse = {
    tokens: M_Credentials;
    user: M_User;
};
