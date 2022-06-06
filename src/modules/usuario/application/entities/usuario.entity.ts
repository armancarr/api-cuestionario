import { Entity } from "@base/entity"

const PROPERTIES = [
    {
        name: 'id',
        type: 'string'
    }
]
export class UsuarioEntity extends Entity {
    constructor() {
        super(PROPERTIES)
    }
}
