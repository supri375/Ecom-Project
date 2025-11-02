import { Link } from '@inertiajs/react';

export function Categories({cats}) {
  return (
    <section className="container mx-auto py-12 px-6">
      <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cats.map(cat => (
        <Link    key={cat.id} href={`/category/${cat.slug}`}> <div
            className="relative shadow-lg group overflow-hidden h-64 w-64 rounded-full cursor-pointer"
          >
            <img
              src={`/storage/${cat.image}`}
              alt={cat.name}
              className="w-full h-64 object-cover object-center transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xl font-medium">{cat.name}</span>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </section>
  );
}
