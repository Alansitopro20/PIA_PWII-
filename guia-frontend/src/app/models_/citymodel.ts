export interface CityModel {
    id?: string;
    name: string;

    subtitulo: string;
    description: string;
    poblacion: number;
    clima: number;
    gentilicio: string;
    estadoRep: string;

    dato_curioso: string[];   // <── nuevo campo

    
    imagenPrincipal: string; // SIEMPRE string, nunca File
    galeria: string[];       // SIEMPRE arreglo de strings
    video_url:string;
}
