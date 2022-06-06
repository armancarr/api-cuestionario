import { IUsuarioGetRequest,  IUsuarioGetResponse, IUsuarioSaveRequest, IUsuarioSaveResponse} from "@models/interfaces/usuarioService";

export interface IUsuarioService {
    save(payload: IUsuarioSaveRequest): Promise<IUsuarioSaveResponse>
    get(payload: IUsuarioGetRequest): Promise<IUsuarioGetResponse>
}
