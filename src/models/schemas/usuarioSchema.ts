import joi from 'joi'

const usuarioSchemaRequest = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
}).required()


export const UsuarioSchemaRequest = {
    usuarioSchemaRequest
}

