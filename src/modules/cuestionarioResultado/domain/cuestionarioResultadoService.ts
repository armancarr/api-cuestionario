
import { provide } from 'inversify-binding-decorators'

import { TYPES } from '@config/types'
import { ICuestionarioResultadoService } from '.'
import { CuestionarioResultadoRepository } from '@modules/cuestionarioResultado/application/repositories/cuestionarioResultado.repository'
import { inject } from 'inversify'
import { IConfig } from '@config/index'
import { ICuestionarioSaveResponse, ICuestionarioSaveRespuestasRequest } from '@models/interfaces/cuestionarioService'
import { Logger } from '@base/logger'
import { TYPES_ERRORS } from '@config/types.enum'

@provide(TYPES.CuestionarioResultadoService)
export class CuestionarioResultadoService implements ICuestionarioResultadoService {
    public repo: CuestionarioResultadoRepository
    public logger: Logger
    constructor(@inject(TYPES.IConfig) private config: IConfig,
    @inject(TYPES.ILogger)  logger: Logger) {
        this.repo = new CuestionarioResultadoRepository(this.config)
        this.logger = logger
    }

    public saveRespuestas = async(payload: ICuestionarioSaveRespuestasRequest) => {
        let respuesta:ICuestionarioSaveResponse = {
            status:'SUCCESS'
        }
        let queryResult:any
        const elem = payload     
        let filter:any   
        let arrFilters:any[]=[]
        arrFilters.push(['idUsuario','=',payload.idUsuario])
        arrFilters.push(['idCuestionario','=',payload.idCuestionario])
            filter ={
                and : arrFilters
            }
        try{
            queryResult = await this.repo.getMany(filter)
             let dataRes:any
            if (queryResult.length > 0 && queryResult[0]){
                const elemento:Object={
                    id:queryResult[0]._id,
                    message: JSON.stringify(elem)
                }
                dataRes= await this.repo.update(elemento)
                this.logger.debug(`CuestionarioResultadoService->Save: Actualizado Resultado ${JSON.stringify(elemento)}`)
            }else{
                dataRes= await this.repo.create(elem)
                this.logger.debug(`CuestionarioResultadoService->Save: Creado Resultado ${JSON.stringify(elem)}`)
            }
            respuesta.data=dataRes
            return respuesta
        }catch(error){
            this.logger.error(`CuestionarioResultadoService->Save: Error actualizando item ${JSON.stringify(error)}`,TYPES_ERRORS.internal_server_error)
            throw new Error('internal_server_error')
        }
    }
}
