
import { MongoClient, ObjectId } from 'mongodb'
import { mongoQueryBuilder } from '../../../../src/utiles'
import { IDataBase } from '../../'

// TODO: Implementar la lógica particular de mongoDB
export class MongoDB implements IDataBase {
    
    dbName: string
    client: MongoClient

    private static instance: MongoDB
    private static flag: boolean
    private db: any
    n = false

    private constructor(config: any) {
        const { host, user, password, dbName, port } = config
        const credentialsString = user ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}@` : ''
        const portString = port ? `:${port}` : ''
        const url = `mongodb://${credentialsString}${host}${portString}`
        this.dbName = dbName;
        this.client = new MongoClient(url);

        this.client.connect().then((res) => {
            console.log('Connection success!')
            this.db = res.db(dbName)
        }).catch((err) => console.log('Connection Error:::', err))
    }

    public static getConnection = (config: any) => {
        if (!MongoDB.flag) {
            MongoDB.flag = true
            MongoDB.instance = new MongoDB(config)
        }
        return MongoDB.instance
    }

    get = async (id: string, collection: string): Promise<any> => {
        const _id = new ObjectId(id)
        return new Promise((resolve, reject) => {
            this.db.collection(collection).find({"_id": _id}).toArray((error: any, data: any) => {
                if (error) {
                    return reject(error)
                }
                return resolve(data)
            })
        })
    }

    save = async (elem: any, collection: string): Promise<any> => {
        return new Promise((resolve, reject) => {console.log(elem, collection)
            this.db.collection(collection).insertOne(elem, (error: any, resp: any) => {
                if (error) {
                    return reject(error)
                }
                return resolve(resp)
            })
        })
    }

    delete = async (elem: any, collection: string): Promise<boolean> => {
        const _id = new ObjectId(elem.id)

        return new Promise((resolve, reject) => {console.log(elem, collection)
            this.db.collection(collection).remove({"_id": _id}, (error: any, resp: any) => {
                if (error) {
                    return reject(error)
                }
                return resolve(resp)
            })
        })
    }

    getAll = async (collection: string, limit?: number): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).find({}).toArray((error: any, data: any) => {
                if (error) {
                    return reject(error)
                }
                return resolve(data)
            })
        })
    }

    getMany = async (filter: any, collection: string, options?:any): Promise<any[]> => {
        let mongoObj:Object={}
        let projections:Object={}
        if(options){
            mongoObj = options
            if (Array.isArray(options)){
                mongoObj = options[0]
                projections = options[1]
            }
        }else{
             mongoObj = mongoQueryBuilder(filter)
        }
        console.debug('final string', mongoObj, JSON.stringify(mongoObj))

        return new Promise((resolve, reject) => {
            this.db.collection(collection).find(mongoObj,projections).toArray((error: any, data: any) => {
                if (error) {
                    console.error("Mongo getMany - Error en la consulta de datos:::", error)
                    return reject(error)
                }
                console.debug("data devuelta de BD",data)
                
                console.debug("collection BD",collection)
                return resolve(data)
            })
        })
    }

    update = async (elem: any, collection: string): Promise<any> => {
        const id = elem.id
        const message = elem.message
        
        console.debug("incoming json", JSON.parse(message))

        return new Promise((resolve, reject) => {
            this.db.collection(collection).replaceOne(
                {"_id": new ObjectId(id)},
                JSON.parse(message),
                (error: any, resp: any) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(resp)
                }
            )
        })
    }
}
