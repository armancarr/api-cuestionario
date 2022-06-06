import * as express from 'express'
import { inject } from 'inversify'
import {
    controller,
    httpGet,
    httpPost,
    interfaces,
    request,
    response
} from 'inversify-express-utils'
import { IHttpResponse } from '@models/interfaces/httpResponse'
import { TYPES } from '@config/types'
import { UsuarioService } from '@modules/usuario/domain/usuarioService'
import { UsuarioSchemaRequest } from '@models/schemas/usuarioSchema'
import { Logger } from '@base/logger'
import { TYPES_ERRORS } from '@config/types.enum'

@controller('/usuario')
export class UsuarioController implements interfaces.Controller {
    private body: any
    public logger
    constructor(
        @inject(TYPES.UsuarioService) private usuarioService: UsuarioService,
        @inject(TYPES.ILogger)  logger: Logger
    ) {
        this.logger = logger
    }

    @httpPost('/get')
    public async get(
        @request() req: express.Request,
        @response() res: express.Response
    ): Promise<IHttpResponse> {
        this.body = req.body        
        const validatorSchema = UsuarioSchemaRequest.usuarioSchemaRequest.validate(this.body)
        if (validatorSchema.error) {
            await this.logger.error(`Usuario Controller->Get: Estructura inválida:${validatorSchema.error}`,TYPES_ERRORS.internal_server_error)
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        
        try {
            const serviceRes=await this.usuarioService.get(this.body)
            return {
                status: 200,
                data: serviceRes.data
            }    
        } catch (err) {
            return {
                status: 500,
                errors: [ err ]
            }    
        }
    }

    @httpPost('/save')
    public async save(
        @request() req: express.Request,
        @response() res: express.Response
    ): Promise<IHttpResponse> {
        this.body = req.body        
        const validatorSchema = UsuarioSchemaRequest.usuarioSchemaRequest.validate(this.body)
        if (validatorSchema.error) {
            await this.logger.error(`Usuario Controller->Save: Estructura inválida:${validatorSchema.error}`,TYPES_ERRORS.internal_server_error)
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        
        try {
            const serviceRes=await this.usuarioService.save(this.body)
            return {
                status: 200,
                data: serviceRes.data
            }    
        } catch (err) {
            return {
                status: 500,
                errors: [ err ]
            }    
        }
    }
}
