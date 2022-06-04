import { buildProviderModule, container } from "@base/../inversify.config"

/* REST Controllers */
import "@modules/cuestionario/infraestructure/cuestionarioController"
import "@modules/cuestionario/domain/cuestionarioService"
import "@modules/cuestionarioResultado/infraestructure/cuestionarioResultadoController"
import "@modules/cuestionarioResultado/domain/cuestionarioResultadoService"
container.load(buildProviderModule())