export interface StadiumModel{
    id: number;
    name: string;
    descripcion: string;
    capacidad: number;
    ciudad: string;
    imagenPrincipal: string; // SIEMPRE string, nunca File
    galeria: string[];       // SIEMPRE arreglo de strings
}