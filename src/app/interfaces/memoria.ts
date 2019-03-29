export interface TitleItem {

    title: string;
    validator: boolean;
}

export interface Memoria {

    title: string;
    date: Date;
    text: string;
    color: string;
    icon: string;


}

export interface MemoriaLista {

    items: Array<Memoria>
}


  