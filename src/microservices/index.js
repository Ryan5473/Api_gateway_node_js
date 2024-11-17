import * as fs from 'fs'

const folderPath = new URL('./', import.meta.url)

const files = fs.readdirSync(folderPath)

const microservices = files
  .filter((fileName) => fileName.includes('.microservice'))
  .map(async (fileName) => {
    const { default: microservice } = await import(new URL(fileName, folderPath))
    return microservice
  })

const MICROSERVICES = await Promise.all(microservices)

export default MICROSERVICES
