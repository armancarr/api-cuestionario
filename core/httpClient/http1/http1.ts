
import axios from 'axios'
import { IHttpClient } from '../'

export class HttpClient1 implements IHttpClient {

    // TODO: implementar header, encriptación 
    constructor() {

    }
    get(url: string, body: any): Promise<any[]> {
        try {
            return axios.get(url, body)
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }
    put(url: string, body: any): Promise<any> {
        try {
            return axios.put(url, body)
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }
    post(url: string, body: any): Promise<any> {
        try {
            return axios.post(url, body)
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }
    delete(url: string, filter: { key: string; operator: string; value: any }[]): Promise<boolean> {
        try {
            return axios.delete(url, {})
        } catch (err) {
            throw new Error(JSON.stringify(err))
        }
    }
}
