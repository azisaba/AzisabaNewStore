type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    tags: string;
    hidden: boolean;
}

type SaraProduct = {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    tags?: undefined;
    hidden: boolean;
}
