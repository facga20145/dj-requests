import { DestinationsEntity } from "../entities/destinations.entity";

export class DestinationsFactory {
    static createFromPrisma(data:any):DestinationsEntity{
       return {
        id: data.id,
        name: data.name,
        description: data.description,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        precio: data.precio,
        category: data.category,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
       }
    }
}