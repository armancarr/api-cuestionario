
import { Repository } from '@base/repository'
import { IConfig } from '@config/index'
import { UsuarioEntity } from '../entities/usuario.entity'

export class UsuarioRepository extends Repository {
    constructor(config: IConfig) {
        super(new UsuarioEntity(), 'usuario',config)
    }
}
