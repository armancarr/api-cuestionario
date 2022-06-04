# Cuestionario-Api
- La solución esta hecha en NodeJS, esta escrita en TypeScript.
- Se realiza implementación bajo arquitectura hexagonal, implementando coomunicación con mongoDB para persistencia
- Se realiza implmentación de 3 endpoints: 
    - getAll: Para traer todos los cuestionarios dispnibles en BD
    - get: 
        Para traer un cuestionario especifico
        Con el filtro de idPregunta se puede devolver pregunta especídifica de un cuestionario
        Con el filtro de idRespuesta se puede devolver respuesta especídifica de una pregunta de algún cuestionario.
    -save: 
        Agregar nuevo cuestionario
        Modificar información del cuestionario, preguntas o respuestas
- para correr el proyecto ejecutar npm run dev
- el archivo cuestionario.json, y cuestionarioResultado.json, es un export de las collections BD mongo con dichos nombres, la BD se puede cambier su nombre en las variables de ambiente, por favor tomar como ejemplo el archivo .env.sample
- Espero cumpla con las espectativas, muchas gracias por la oportunidad de participar. 
# Armando Jose Carrillo Ortega