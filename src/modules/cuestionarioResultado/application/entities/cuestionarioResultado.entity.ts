import { Entity } from "@base/entity"

const PROPERTIES = [
    {
        name: 'id',
        type: 'string'
    }
]
export class CuestionarioResultadoEntity extends Entity {
    constructor() {
        super(PROPERTIES)
    }
}
