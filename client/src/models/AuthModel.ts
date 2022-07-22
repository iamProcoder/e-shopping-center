export interface IRegister {
    email: string,
    password: string,
    comparePassword: string | undefined;
    name: string,
    surname: string,
    birthday: string
};

export interface ILogin {
    email: string,
    password: string
};