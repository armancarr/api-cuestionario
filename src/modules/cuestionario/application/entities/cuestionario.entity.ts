import { Entity } from "@base/entity"

const PROPERTIES = [
    {
        name: 'id',
        type: 'string'
    }
]
export class CuestionarioEntity extends Entity {
    constructor() {
        super(PROPERTIES)
    }
}
