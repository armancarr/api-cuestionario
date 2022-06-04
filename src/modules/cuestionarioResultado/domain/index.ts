import { ICuestionarioSaveResponse, ICuestionarioSaveRespuestasRequest} from "@models/interfaces/cuestionarioService";

export interface ICuestionarioResultadoService {
    saveRespuestas(payload: ICuestionarioSaveRespuestasRequest): Promise<ICuestionarioSaveResponse>
}
