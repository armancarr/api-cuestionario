
import { Repository } from "@base/repository";
import { Entity } from "@base/entity"

export interface IBaseService {
    index (): Promise<Entity[]|Object[]>
    create (): Promise<Entity|Object> 
    get (): Promise<Entity|Object>
    getMany (): Promise<Entity|Object>
    update (): Promise<Entity|Object>
    delete (): Promise<Boolean>
    repository: Repository
}

