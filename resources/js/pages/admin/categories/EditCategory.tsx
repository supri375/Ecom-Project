import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
interface formdata {
    name: string;
    id:string;
    slug:string;
}
interface category extends formdata {
    image: string | null;
}



const EditCategory = ({category}) => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>();
    const [formData, setFormData] = useState<formdata>({
        id :' ',
        name: "",
        slug: "",
    });
    useEffect(()=>{
         setFormData(prev => ({ ...prev, name: category.name ,
            slug : category.slug
         }));
    },[]);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        let fd = new FormData();
        fd.append("name", formData.name);
        fd.append("slug", formData.slug);
        if (image) {
            fd.append("image", image);
        }
        router.post(route('categories.update',category.id), fd), {
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
            <Head title="EditCategory" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="auto-rows-min gap-4">
                    <div className="max-w-5xl mx-auto p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Edit Category</h2>
                            <Link href="/admin/categories" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 active:scale-95">
                                Go Back
                            </Link>
                        </div>
                        <div className="w-full mx-auto flex items-center justify-center p-10 rounded-[20px] shadow-xl border-[0.1px]">
                            <form id="formid" onSubmit={handleSubmit} className="flex flex-col w-full gap-[10px]">
                                <label>Name : </label>
                                <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} className="w-3xs border rounded-lg px-2"></input>
                                <label>Slug : </label>
                                <input type="text" id="slug" name="slug" onChange={handleChange} value={formData.slug} className="w-3xs border rounded-lg px-2"></input>
                                <label>Drop Image : </label>
                                <input type="file" onChange={handleImage} className="w-3xs border cursor-pointer  active:bg-gray-600 rounded-lg px-2" />
                                {
                                    previewUrl ? <img src={previewUrl} width="100px" height="100px" />:<img src={`/storage/${category.image}`} width="100px" height="100px"  /> 
                                   
                                }
                                <button className="mx-auto bg-blue-600 rounded-[10px] text-[14px] ml-0 h-[40px] w-[30%] text-white my-2 cursor-pointer active:bg-blue-400 hover:bg-blue-500 ">Update</button>
                                <p id="para" className="hidden text-green-600">Form Submitted Successfully!</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
export default EditCategory;