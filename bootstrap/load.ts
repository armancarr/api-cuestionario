import { buildProviderModule, container } from "@base/../inversify.config"

/* REST Controllers */
import "@modules/cuestionario/infraestructure/cuestionarioController"
import "@modules/cuestionario/domain/cuestionarioService"
import "@modules/cuestionarioResultado/infraestructure/cuestionarioResultadoController"
import "@modules/cuestionarioResultado/domain/cuestionarioResultadoService"
import "@modules/usuario/infraestructure/usuarioController"
import "@modules/usuario/domain/usuarioService"
container.load(buildProviderModule())