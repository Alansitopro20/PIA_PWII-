export interface StayModel {
    id: number;
    name: string;
    descripcion: string;
    ciudad: string;
    precio: number;
    imagenPrincipal: string; // SIEMPRE string, nunca File
    galeria: string[];       // SIEMPRE arreglo de strings
}