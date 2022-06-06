export interface IUsuarioSaveResponse {
    status:string,
    data?: any;
    errors?: any[]
}

export interface IUsuarioSaveRequest {
	email: string,
	password:string,
}

export interface IUsuarioGetResponse {
    status: string,
    data?: any;
    errors?: any[]
}

export interface IUsuarioGetRequest {
    email:string,
    password:string
}

