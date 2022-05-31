
import { Repository } from '@base/repository'
import { CuestionarioEntity } from "@modules/cuestionario/application/entities/cuestionario.entity"
import { IConfig } from '@config/index'

export class CuestionarioRepository extends Repository {
    constructor(config: IConfig) {
        super(new CuestionarioEntity(), 'cuestionario',config)
    }
}
