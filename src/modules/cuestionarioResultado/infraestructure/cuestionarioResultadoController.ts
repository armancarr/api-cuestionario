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
import { CuestionarioResultadoService } from '@modules/cuestionarioResultado/domain/cuestionarioResultadoService'
import { CuestionarioSchemaRequest } from '@models/schemas/cuestionarioSchema'
import { Logger } from '@base/logger'
import { TYPES_ERRORS } from '@config/types.enum'

@controller('/cuestionarioResultado')
export class CuestionarioResultadoController implements interfaces.Controller {
    private body: any
    public logger
    constructor(
        @inject(TYPES.CuestionarioResultadoService) private cuestionarioResultadoService: CuestionarioResultadoService,
        @inject(TYPES.ILogger)  logger: Logger
    ) {
        this.logger = logger
    }


    @httpPost('/saveRespuestas')
    public async saveRespuestas(
        @request() req: express.Request,
        @response() res: express.Response
    ): Promise<IHttpResponse> {
        this.body = req.body        
        const validatorSchema = CuestionarioSchemaRequest.CuestionarioSaveRespuestaSchemaRequest.validate(this.body)
        if (validatorSchema.error) {
            await this.logger.error(`Cuestionario Controller->saveRespuestas: Estructura inválida:${validatorSchema.error}`,TYPES_ERRORS.internal_server_error)
            return {
                status: 422,
                errors: ['Invalid structure']
            }
        }
        
        try {
            const serviceRes=await this.cuestionarioResultadoService.saveRespuestas(this.body)
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
