import joi from 'joi'

const CuestionarioGetSchemaRequest = joi.object().keys({
    idCuestionario: joi.string().required(),
    idPregunta: joi.string().optional(),
    idRespuesta: joi.string().optional(),
}).required()

const CuestionarioSaveSchemaRequest = joi.object().keys({
    idCuestionario: joi.string().required(),
    nombre: joi.string().optional().allow(''),
    state: joi.boolean().required(),
    preguntas: joi.array().items({
        id: joi.string().required(),
        pregunta: joi.string().required(),
        state: joi.boolean().required(),
        respuestas: joi.array().items({
            id: joi.string().required(),
            respuesta: joi.any().required(),
            state: joi.boolean().required(),
            esCorrecta: joi.boolean().required(),
        }).optional().min(0),
    }).optional().min(0),
}).required()

const CuestionarioGetAllSchemaRequest = joi.object().keys({
}).required()

const CuestionarioSaveRespuestaSchemaRequest = joi.object().keys({
    idUsuario: joi.string().required(),
    idCuestionario: joi.string().required(),
    respCuestionario: joi.array().items({
        esCorrecta: joi.boolean().required(),
        pregunta: joi.string().required(),
        respuestaUser: joi.string().required(),
    }).required()
}).required()
export const CuestionarioSchemaRequest = {
    CuestionarioGetSchemaRequest,
    CuestionarioSaveSchemaRequest,
    CuestionarioGetAllSchemaRequest,
    CuestionarioSaveRespuestaSchemaRequest
}

