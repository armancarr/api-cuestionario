import { ICuestionarioGetRequest,  ICuestionarioGetResponse, ICuestionarioSaveResponse, ICuestionarioSaveRequest} from "@models/interfaces/cuestionarioService";

export interface ICuestionarioService {
    save(payload: ICuestionarioSaveRequest): Promise<ICuestionarioSaveResponse>
    get(payload: ICuestionarioGetRequest): Promise<ICuestionarioGetResponse>
}
