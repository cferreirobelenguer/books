export interface Book {
    id: string,
    titulo: string,
    genre: string,
    autor: string,
    editorial: string
    descripcion: string,
    img: string,
    new: boolean,
    tapa:string,
    ISBN: string,
    otherBooks?: string
}