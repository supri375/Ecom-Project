import { Categories } from "@/components/frontend/Categories"
import { DiscountProducts } from "@/components/frontend/DiscountProducts"
import { FeaturedProducts } from "@/components/frontend/FeaturedProducts"
import { Hero } from "@/components/frontend/Hero"
import Layout from "@/components/frontend/Layout"
import { PopularProducts } from "@/components/frontend/PopularProducts"

const Homepage=({heroes,cats,featuredProds,discountProducts,popularProducts})=>{
    return(
        <div>
        <Layout>
            <div
             className=" p-4"
            ><Hero
            heroes={heroes}/>
            <Categories 
            cats={cats}/>
            <FeaturedProducts 
            featuredProducts={featuredProds}
            />
            <DiscountProducts
            discountProducts={discountProducts} />
            </div>
            <PopularProducts
            popularProducts={popularProducts} />
        </Layout>
        </div>
    )
}
export default Homepage;