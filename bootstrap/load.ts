import { buildProviderModule, container } from "@base/../inversify.config"

/* REST Controllers */
import "@modules/cuestionario/infraestructure/cuestionarioController"
import "@modules/cuestionario/domain/cuestionarioService"
container.load(buildProviderModule())