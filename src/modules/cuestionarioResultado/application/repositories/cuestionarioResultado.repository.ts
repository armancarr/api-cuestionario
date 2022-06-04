
import { Repository } from '@base/repository'
import { IConfig } from '@config/index'
import { CuestionarioResultadoEntity } from '../entities/cuestionarioResultado.entity'

export class CuestionarioResultadoRepository extends Repository {
    constructor(config: IConfig) {
        super(new CuestionarioResultadoEntity(), 'cuestionarioResultado',config)
    }
}
