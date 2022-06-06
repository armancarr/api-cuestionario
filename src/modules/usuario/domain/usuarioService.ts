
import { provide } from 'inversify-binding-decorators'

import { TYPES } from '@config/types'
import { IUsuarioService } from '.'
import { UsuarioRepository } from '@modules/usuario/application/repositories/usuario.repository'
import { inject } from 'inversify'
import { IConfig } from '@config/index'
import { IUsuarioGetRequest, IUsuarioGetResponse, IUsuarioSaveRequest, IUsuarioSaveResponse } from '@models/interfaces/usuarioService'
import { Logger } from '@base/logger'
import { TYPES_ERRORS } from '@config/types.enum'

@provide(TYPES.UsuarioService)
export class UsuarioService implements IUsuarioService {
    public repo: UsuarioRepository
    public logger: Logger
    constructor(@inject(TYPES.IConfig) private config: IConfig,
    @inject(TYPES.ILogger)  logger: Logger) {
        this.repo = new UsuarioRepository(this.config)
        this.logger = logger
    }

    public get = async (payload: IUsuarioGetRequest) => {
        let respuesta:IUsuarioGetResponse = {
            status: 'SUCCESS'
        }
        let filter:any={}
        let options:any=''
        let filters:any[]=[]        

        filters.push(["email", "=", payload.email])
        filters.push(["password","=",payload.password])

        filter ={
            and : filters
        } 
        this.logger.debug(`UsuarioService->Get: ${filter}`)
        try {
            const queryResult:any = await this.repo.getMany(filter, options)
            if (queryResult.length > 0) {
                this.logger.debug(`repository response:::: ${JSON.stringify(queryResult)}`)
                respuesta.data = true
                this.logger.debug(`UsuarioService->Get: ${JSON.stringify(respuesta.data)}`)
                return respuesta 
            }
            await this.logger.error(`UsuarioService->Get: No Existe id`,TYPES_ERRORS.internal_server_error)
            return respuesta = {
                status: 'SUCCESS',
                data: false
            }
        } catch(error) {
            await this.logger.error(`UsuarioService->Get: Error en consulta de item ${JSON.stringify(error)}`,TYPES_ERRORS.internal_server_error)
            throw new Error('internal_server_error')
        }
    }

    public save = async(payload: IUsuarioSaveRequest) => {
        let respuesta:IUsuarioSaveResponse = {
            status:'SUCCESS'
        }
        let queryResult:any
        const elem = payload        
        const filters:any=  ["email", "=", payload.email]
        try{
            queryResult = await this.repo.getMany(filters)
             let dataRes:any
            if (queryResult.length > 0 && queryResult[0]){
                const elemento:Object={
                    id:queryResult[0]._id,
                    message: JSON.stringify(elem)
                }
                dataRes= await this.repo.update(elemento)
                this.logger.debug(`UsuarioService->Save: Actualizado Usuario ${JSON.stringify(elemento)}`)
            }else{
                dataRes= await this.repo.create(elem)
                this.logger.debug(`UsuarioService->Save: Creado Usuario ${JSON.stringify(elem)}`)
            }
            respuesta.data=dataRes
            return respuesta
        }catch(error){
            this.logger.error(`UsuarioService->Save: Error actualizando item ${JSON.stringify(error)}`,TYPES_ERRORS.internal_server_error)
            throw new Error('internal_server_error')
        }
    }
}
