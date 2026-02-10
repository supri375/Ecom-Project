import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Homepage from './HomePage';
interface Product {
    id:number;
    name:string;   
    image:string;
    category:string;
    rating:number;
    price:string;
    description:string;
    isDiscount:number;
    isFeatured:number;
    isPopular:number;
}

interface Hero {
    name:string;
    image:string;
}

interface Category {
    id:number;
    name:string;
    image:string;
}
interface Props {
  categories :Category[];
  products:Product[];
  featuredProducts:Product[];
  discountProducts:Product[];
  popularProducts:Product[];
  heroes:Hero;
}
export default function Welcome({heroes,products,categories,featuredProducts, discountProducts,popularProducts}:Props) {
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            <>
                <Head title="Welcome">
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                </Head>
                    <div className=" w-full items-center dark:bg-gray-900 justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                        <>
                            <Homepage
                            heroes={heroes}
                            prods={products} 
                            cats={categories} 
                            featuredProds={featuredProducts}
                            discountProducts={discountProducts}
                            popularProducts={popularProducts}
                            />
                        </>
                    </div>
            </>
        </>
    );
}
