export interface CityModel {
    id?: string;
    name: string;
    description: string;
    poblacion: number;
    clima: number;
    gentilicio: string;
    estadoRep: string;
    imagenPrincipal: string; // SIEMPRE string, nunca File
    galeria: string[];       // SIEMPRE arreglo de strings
}
