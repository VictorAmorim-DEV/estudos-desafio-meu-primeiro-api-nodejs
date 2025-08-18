import { fastifySwagger } from '@fastify/swagger'

import fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { createCoursesRoute } from './src/database/routes/create-courses.ts'
import { getCoursesRoute } from './src/database/routes/get-courses.ts'
import { getCoursesByIdRoute } from './src/database/routes/get-courses-by-id.ts'
import scalarAPIReference from '@scalar/fastify-api-reference'

const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === 'development'){
    server.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Desafio Node.js',
            version: '1.0.0',
        }
    },
    transform: jsonSchemaTransform,
})

server.register(scalarAPIReference,{
  routePrefix: '/docs',
  configuration: {
    theme: 'bluePlanet'
  }
})
}

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(createCoursesRoute)
server.register(getCoursesByIdRoute)
server.register(getCoursesRoute)

server.listen({port:3333}).then (() => {
    console.log ('HTTP server running')
})