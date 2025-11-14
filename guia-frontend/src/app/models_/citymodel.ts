export interface CityModel {
    id: number;
    name: string;
    description: string;
    poblacion: number;
    clima: number;
    gentilicio: string;
    estadoRep: string;
    imagenPrincipal: File | string;
    galeria?: File | string[]; // Arreglo de URLs de imágenes
}