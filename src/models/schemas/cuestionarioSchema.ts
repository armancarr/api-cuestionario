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
        }).required(),
    }).required()
}).required()
export const CuestionarioSchemaRequest = {
    CuestionarioGetSchemaRequest,
    CuestionarioSaveSchemaRequest
}