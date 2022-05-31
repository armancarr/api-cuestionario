export interface ICuestionarioSaveResponse {
    status:string,
    data?: any;
    errors?: any[]
}

export interface ICuestionarioSaveRequest {
	idCuestionario: string,
	nombre:string,
	state: boolean,
	preguntas: IPreguntaCuestionario[],
}

export interface IPreguntaCuestionario {
		id:string,
		pregunta: string,
		state: boolean,
		respuestas: IRespuestaCuestionario[]
}

export interface IRespuestaCuestionario{
    id:string,
    respuesta:string,
    esCorrecta: boolean,
    state: boolean
}
export interface ICuestionarioGetResponse {
    status: string,
    data?: any;
    errors?: any[]
}

export interface ICuestionarioGetRequest {
    idCuestionario:string
    idPregunta?: string
    idRespuesta?:string
}

