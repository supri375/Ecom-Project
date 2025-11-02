import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
interface formdata {
    name: string;
    category: string;
    rating: string;
    price: string;
    description: string;
    isDiscount: string;
    isFeatured: string;
    isPopular: string;
}

interface category extends formdata {
    image: string | null;
}




const CreateProduct = ({ categories }) => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>();
    const [formData, setFormData] = useState<formdata>({
        name: "",
        category: "",
        rating: "",
        price: "",
        description: "",
        isDiscount: "false",
        isFeatured: "false",
        isPopular: "false",
    });
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }


    function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        let fd = new FormData();
        fd.append("name", formData.name);
        fd.append("category", formData.category);
        fd.append("rating", formData.rating);
        fd.append("price", formData.price);
        fd.append("description", formData.description);
        fd.append("isDiscount", formData.isDiscount);
        fd.append("isPopular", formData.isPopular);
        fd.append("isFeatured", formData.isFeatured);
        if (image) {
            fd.append("image", image);
        }
        router.post(route('products.store'), fd), {
            onSuccess: 'Form Submitted succesfully',
        }
    }


    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imgfile = e.target.files?.[0];
        if (imgfile) {
            setImage(imgfile);
            setPreviewUrl(URL.createObjectURL(imgfile));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CreateProduct" />
            <div className="flex h-full flex-1 flex-col  gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="auto-rows-min gap-4">
                    <div className="max-w-5xl mx-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Add New Products</h2>
                            <Link href="/admin/categories" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 active:scale-95">
                                Go Back
                            </Link>
                        </div>
                        <div className="w-full mx-auto flex items-center justify-center p-10 rounded-[20px] shadow-xl border-[0.1px]">
                            <form id="formid" onSubmit={handleSubmit} className="flex flex-col  w-full gap-[10px]">
                                <label>Name : </label>
                                <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} className="w-3xs border rounded-lg px-2"></input>
                                <label>category : </label>
                                <select className="w-3xs border  rounded-lg px-2" name="category" value={formData.category} onChange={handleSelect} >
                                    <option>select category</option>
                                    {
                                        categories.map((category, index) => (
                                            <option value={category.id}>{category.name}</option>
                                        ))
                                    }

                                </select>
                                <label>price : </label>
                                <input type="text" id="price" name="price" onChange={handleChange} value={formData.price} className="w-3xs border rounded-lg px-2"></input>
                                <label>rating : </label>
                                <input type="text" id="rating" name="rating" onChange={handleChange} value={formData.rating} className="w-3xs border rounded-lg px-2"></input>
                                <label>Is Discounted:</label>
                                <div className="flex gap-4">
                                    <label><input type="radio" name="is_discounted" value="true" onChange={handleChange} checked={formData.is_discounted === "true"} /> Yes</label>
                                    <label><input type="radio" name="is_discounted" value="false" onChange={handleChange} checked={formData.is_discounted === "false"} /> No</label>
                                </div>

                                <label>Is Featured:</label>
                                <div className="flex gap-4">
                                    <label><input type="radio" name="is_featured" value="true" onChange={handleChange} checked={formData.is_featured === "true"} /> Yes</label>
                                    <label><input type="radio" name="is_featured" value="false" onChange={handleChange} checked={formData.is_featured === "false"} /> No</label>
                                </div>

                                <label>Is Popular:</label>
                                <div className="flex gap-4">
                                    <label><input type="radio" name="is_popular" value="true" onChange={handleChange} checked={formData.is_popular === "true"} /> Yes</label>
                                    <label><input type="radio" name="is_popular" value="false" onChange={handleChange} checked={formData.is_popular === "false"} /> No</label>
                                </div>

                                <label>description : </label>
                                <input type="text" id="description" name="description" onChange={handleChange} value={formData.description} className="w-3xs border rounded-lg px-2"></input>
                                <label>Drop Image : </label>
                                <input type="file" onChange={handleImage} className="w-3xs border cursor-pointer  active:bg-gray-600 rounded-lg px-2" />
                                {
                                    image ? <img src={previewUrl} width="100px" height="100px" /> : <p>Upload an image</p>
                                }
                                <button className="mx-auto bg-blue-600 rounded-[10px] text-[14px] ml-0 h-[40px] w-[30%] text-white my-2 cursor-pointer active:bg-blue-400 hover:bg-blue-500 ">Add Product</button>
                                <p id="para" className="hidden text-green-600">Form Submitted Successfully!</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default CreateProduct;