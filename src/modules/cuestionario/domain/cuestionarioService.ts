
import { provide } from 'inversify-binding-decorators'

import { TYPES } from '@config/types'
import { ICuestionarioService } from '.'
import { CuestionarioRepository } from '@modules/cuestionario/application/repositories/cuestionario.repository'
import { inject } from 'inversify'
import { IConfig } from '@config/index'
import { ICuestionarioGetRequest, ICuestionarioGetResponse, ICuestionarioSaveRequest, ICuestionarioSaveResponse, IPreguntaCuestionario, IRespuestaCuestionario } from '@models/interfaces/cuestionarioService'
import { Logger } from '@base/logger'
import { TYPES_ERRORS } from '@config/types.enum'

@provide(TYPES.CuestionarioService)
export class CuestionarioService implements ICuestionarioService {
    public repo: CuestionarioRepository
    public logger: Logger
    constructor(@inject(TYPES.IConfig) private config: IConfig,
    @inject(TYPES.ILogger)  logger: Logger) {
        this.repo = new CuestionarioRepository(this.config)
        this.logger = logger
    }

    public get = async (payload: ICuestionarioGetRequest) => {
        let respuesta:ICuestionarioGetResponse = {
            status: 'SUCCESS'
        }
        let filter:any={}
        let options:any=''
        let filters:any[]=[]        
        if(payload.idCuestionario && payload.idCuestionario!==''){
            filters.push(["idCuestionario", "=", payload.idCuestionario])
            filters.push(["state","=",true])
        }
        filter ={
            and : filters
        } 
        this.logger.debug(`CuestionarioService->Get: ${filter}`)
        try {
            const queryResult:any = await this.repo.getMany(filter, options)
            if (queryResult.length > 0) {
                this.logger.debug(`repository response:::: ${JSON.stringify(queryResult)}`)
                if (payload.idPregunta && payload.idPregunta!==''){
                    let pregunta:IPreguntaCuestionario = queryResult[0].preguntas.find((pregunta:any) => pregunta.id === payload.idPregunta)
                    if (payload.idRespuesta && payload.idRespuesta!==''){
                        const respu:any = pregunta.respuestas.find((respue:IRespuestaCuestionario) => respue.id === payload.idRespuesta)
                        respuesta.data = respu
                        this.logger.debug(`CuestionarioService->Get: ${JSON.stringify(respuesta.data)}`)
                        return respuesta 
                    }
                    respuesta.data = pregunta
                    this.logger.debug(`CuestionarioService->Get: ${JSON.stringify(respuesta.data)}`)
                    return respuesta 
                }
                respuesta.data = queryResult[0]
                this.logger.debug(`CuestionarioService->Get: ${JSON.stringify(respuesta.data)}`)
                return respuesta 
            }
            await this.logger.error(`CuestionarioService->Get: No Existe id`,TYPES_ERRORS.internal_server_error)
            return respuesta = {
                status: 'Structure error',
                data: ['No existe cuestionario']
            }
        } catch(error) {
            await this.logger.error(`CuestionarioService->Get: Error en consulta de item ${JSON.stringify(error)}`,TYPES_ERRORS.internal_server_error)
            throw new Error('internal_server_error')
        }
    }

    public save = async(payload: ICuestionarioSaveRequest) => {
        let respuesta:ICuestionarioSaveResponse = {
            status:'SUCCESS'
        }
        let queryResult:any
        const elem = payload        
        const filters:any=  ["idCuestionario", "=", payload.idCuestionario]
        try{
            queryResult = await this.repo.getMany(filters)
             let dataRes:any
            if (queryResult.length > 0 && queryResult[0]){
                const elemento:Object={
                    id:queryResult[0]._id,
                    message: JSON.stringify(elem)
                }
                dataRes= await this.repo.update(elemento)
                this.logger.debug(`CuestionarioService->Save: Actualizado Cuestionario ${JSON.stringify(elemento)}`)
            }else{
                dataRes= await this.repo.create(elem)
                this.logger.debug(`CuestionarioService->Save: Creado Cuestionario ${JSON.stringify(elem)}`)
            }
            respuesta.data=dataRes
            return respuesta
        }catch(error){
            this.logger.error(`CuestionarioService->Save: Error actualizando item ${JSON.stringify(error)}`,TYPES_ERRORS.internal_server_error)
            throw new Error('internal_server_error')
        }
    }
}
