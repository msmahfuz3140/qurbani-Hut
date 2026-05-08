import localFallback from "../../public/data.json";

/**
 * Normalize Qurbani API JSON (type, breed, weight, ...) into fields the UI expects.
 */
function normalizeOne(raw) {
  const p = raw && typeof raw === "object" ? raw : {};
  if (
    p.brand != null &&
    p.rating != null &&
    p.stock != null &&
    p.image != null
  ) {
    return {
      ...p,
      id: Number(p.id),
      price: Number(p.price),
      rating: Number(p.rating),
      stock: Number(p.stock),
    };
  }

  const id = Number(p.id) || 0;
  const rating =
    p.rating != null
      ? Number(p.rating)
      : Math.min(5, 4.42 + ((id % 7) * 0.08));
  const stock =
    p.stock != null ? Number(p.stock) : Math.max(6, 48 - id * 3);

  return {
    id,
    name: String(p.name ?? "Listing"),
    brand: String(p.type ?? p.breed ?? "Qurbani"),
    price: Number(p.price ?? 0),
    rating,
    image: String(p.image ?? "/product-images/cow1.PNG"),
    stock,
    category: String(p.category ?? "Livestock"),
    description: String(p.description ?? ""),
    breed: p.breed,
    type: p.type,
    weight: p.weight,
    age: p.age,
    location: p.location,
  };
}

function normalizeList(data) {
  const list = Array.isArray(data) ? data : [];
  return list.map(normalizeOne);
}

export async function getProducts() {
  const url =
    process.env.NEXT_PUBLIC_PRODUCTS_JSON_URL?.trim() ||
    process.env.DATA_JSON_URL?.trim();

  if (url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to load products (${res.status}) from ${url}`);
    }
    const data = await res.json();
    return normalizeList(data);
  }

  return normalizeList(localFallback);
}
