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
import { CuestionarioService } from '@modules/cuestionario/domain/cuestionarioService'
import { CuestionarioSchemaRequest } from '@models/schemas/cuestionarioSchema'
import { Logger } from '@base/logger'
import { TYPES_ERRORS } from '@config/types.enum'

@controller('/cuestionario')
export class CuestionarioController implements interfaces.Controller {
    private body: any
    public logger
    constructor(
        @inject(TYPES.CuestionarioService) private cuestionarioService: CuestionarioService,
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
        const validatorSchema = CuestionarioSchemaRequest.CuestionarioGetSchemaRequest.validate(this.body)
        if (validatorSchema.error) {
            await this.logger.error(`Cuestionario Controller->Get: Estructura inválida:${validatorSchema.error}`,TYPES_ERRORS.internal_server_error)
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        
        try {
            const serviceRes=await this.cuestionarioService.get(this.body)
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
        const validatorSchema = CuestionarioSchemaRequest.CuestionarioSaveSchemaRequest.validate(this.body)
        if (validatorSchema.error) {
            await this.logger.error(`Cuestionario Controller->Save: Estructura inválida:${validatorSchema.error}`,TYPES_ERRORS.internal_server_error)
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        
        try {
            const serviceRes=await this.cuestionarioService.save(this.body)
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
