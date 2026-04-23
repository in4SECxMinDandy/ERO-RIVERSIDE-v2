const CATS_KEY = "ero_mock_categories";
const PRODS_KEY = "ero_mock_products";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type Product = {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  description: string;
  area: number;
  price: number;
  status: "available" | "sold" | "reserved";
  floor: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  imageUrl: string | null;
  features: string[];
};

const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: "Biệt thự ven sông", slug: "biet-thu", description: "Biệt thự cao cấp mặt tiền sông, view thoáng" },
  { id: 2, name: "Shophouse thương mại", slug: "shophouse", description: "Nhà phố thương mại kết hợp kinh doanh" },
  { id: 3, name: "Nhà phố liền kề", slug: "lien-ke", description: "Nhà phố liền kề trong khu đô thị" },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1, name: "BT-01 Biệt thự Sông Cầu", categoryId: 1, categoryName: "Biệt thự ven sông", categorySlug: "biet-thu",
    description: "Biệt thự đơn lập 4 tầng, mặt tiền 12m, view trực tiếp sông Cầu, thiết kế Châu Âu hiện đại.",
    area: 350, price: 28.5, status: "available", floor: 4, bedrooms: 5, bathrooms: 5,
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    features: ["Hồ bơi riêng", "Sân vườn", "Garage 2 ô tô", "View sông"]
  },
  {
    id: 2, name: "BT-02 Biệt thự Phong Lan", categoryId: 1, categoryName: "Biệt thự ven sông", categorySlug: "biet-thu",
    description: "Biệt thự song lập 3 tầng, thiết kế Indochine, hướng Đông Nam, view vườn cây xanh.",
    area: 280, price: 22.0, status: "reserved", floor: 3, bedrooms: 4, bathrooms: 4,
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    features: ["Sân vườn rộng", "Garage 2 ô tô", "Hệ thống smarthome"]
  },
  {
    id: 3, name: "BT-03 Biệt thự Hoàng Gia", categoryId: 1, categoryName: "Biệt thự ven sông", categorySlug: "biet-thu",
    description: "Biệt thự đơn lập diện tích lớn, cổng riêng, khuôn viên xanh mát, thiết kế Tân Cổ Điển.",
    area: 420, price: 35.0, status: "sold", floor: 4, bedrooms: 6, bathrooms: 6,
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    features: ["Hồ bơi vô cực", "Sân tennis", "Phòng gym", "Garage 3 ô tô"]
  },
  {
    id: 4, name: "SH-01 Shophouse Trung Tâm A1", categoryId: 2, categoryName: "Shophouse thương mại", categorySlug: "shophouse",
    description: "Shophouse mặt tiền đại lộ chính, 5 tầng, tầng 1 kinh doanh, tầng 2-5 để ở.",
    area: 180, price: 14.5, status: "available", floor: 5, bedrooms: 3, bathrooms: 4,
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    features: ["Mặt tiền đại lộ 36m", "Tầng 1 kinh doanh", "Thang máy", "Sân thượng"]
  },
  {
    id: 5, name: "SH-02 Shophouse Phố Thương Mại B2", categoryId: 2, categoryName: "Shophouse thương mại", categorySlug: "shophouse",
    description: "Shophouse khu phố thương mại sầm uất, gần cổng chính dự án, tiện kinh doanh.",
    area: 160, price: 12.8, status: "available", floor: 5, bedrooms: 3, bathrooms: 3,
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    features: ["Gần cổng chính", "Mặt tiền 6m", "Tầng 1 kinh doanh"]
  },
  {
    id: 6, name: "SH-03 Shophouse Góc 2 Mặt Tiền", categoryId: 2, categoryName: "Shophouse thương mại", categorySlug: "shophouse",
    description: "Shophouse góc 2 mặt tiền, vị trí đắc địa, phù hợp kinh doanh dịch vụ cao cấp.",
    area: 200, price: 16.2, status: "reserved", floor: 5, bedrooms: 3, bathrooms: 4,
    imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
    features: ["Góc 2 mặt tiền", "Vị trí đắc địa", "Hầm để xe"]
  },
  {
    id: 7, name: "LK-01 Liền kề Hoa Hồng A", categoryId: 3, categoryName: "Nhà phố liền kề", categorySlug: "lien-ke",
    description: "Nhà phố liền kề 4 tầng, hướng Nam, nội khu yên tĩnh, tiện ích đầy đủ.",
    area: 120, price: 9.5, status: "available", floor: 4, bedrooms: 4, bathrooms: 4,
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    features: ["Hướng Nam", "Sân trước sau", "Nội khu an ninh"]
  },
  {
    id: 8, name: "LK-02 Liền kề Hoa Hồng B", categoryId: 3, categoryName: "Nhà phố liền kề", categorySlug: "lien-ke",
    description: "Nhà phố 4 tầng, thiết kế hiện đại, ngay cạnh công viên xanh, yên tĩnh.",
    area: 115, price: 9.0, status: "available", floor: 4, bedrooms: 3, bathrooms: 3,
    imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
    features: ["Cạnh công viên", "Hướng Đông Nam", "Nội thất cao cấp"]
  },
  {
    id: 9, name: "LK-03 Liền kề Trục Chính", categoryId: 3, categoryName: "Nhà phố liền kề", categorySlug: "lien-ke",
    description: "Nhà phố mặt trục chính nội khu, thuận tiện di chuyển, gần trường học, bệnh viện.",
    area: 130, price: 10.5, status: "sold", floor: 4, bedrooms: 4, bathrooms: 4,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    features: ["Mặt trục chính", "Gần trường học", "Gần bệnh viện"]
  },
  {
    id: 10, name: "LK-04 Liền kề Góc Vườn Hoa", categoryId: 3, categoryName: "Nhà phố liền kề", categorySlug: "lien-ke",
    description: "Nhà phố liền kề vị trí góc, view vườn hoa nội khu, thiết kế tối ưu không gian sống.",
    area: 140, price: 11.2, status: "available", floor: 4, bedrooms: 4, bathrooms: 4,
    imageUrl: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
    features: ["Vị trí góc", "View vườn hoa", "2 mặt thoáng"]
  },
];

function load<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

function initIfEmpty() {
  if (!localStorage.getItem(CATS_KEY)) save(CATS_KEY, INITIAL_CATEGORIES);
  if (!localStorage.getItem(PRODS_KEY)) save(PRODS_KEY, INITIAL_PRODUCTS);
}

export const categoryStore = {
  getAll(): Category[] {
    initIfEmpty();
    return load<Category>(CATS_KEY, INITIAL_CATEGORIES);
  },
  create(data: Omit<Category, "id">): Category {
    const items = this.getAll();
    const newItem: Category = { ...data, id: Date.now() };
    save(CATS_KEY, [...items, newItem]);
    return newItem;
  },
  update(id: number, data: Partial<Omit<Category, "id">>): Category {
    const items = this.getAll();
    const updated = items.map(c => c.id === id ? { ...c, ...data } : c);
    save(CATS_KEY, updated);
    return updated.find(c => c.id === id)!;
  },
  delete(id: number) {
    save(CATS_KEY, this.getAll().filter(c => c.id !== id));
  },
};

export const productStore = {
  getAll(): Product[] {
    initIfEmpty();
    return load<Product>(PRODS_KEY, INITIAL_PRODUCTS);
  },
  getById(id: number): Product | undefined {
    return this.getAll().find(p => p.id === id);
  },
  create(data: Omit<Product, "id" | "categoryName" | "categorySlug">): Product {
    const items = this.getAll();
    const cat = categoryStore.getAll().find(c => c.id === data.categoryId);
    const newItem: Product = {
      ...data,
      id: Date.now(),
      categoryName: cat?.name || "",
      categorySlug: cat?.slug || "",
    };
    save(PRODS_KEY, [...items, newItem]);
    return newItem;
  },
  update(id: number, data: Partial<Omit<Product, "id">>): Product {
    const items = this.getAll();
    const cat = data.categoryId ? categoryStore.getAll().find(c => c.id === data.categoryId) : null;
    const updated = items.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        ...data,
        ...(cat ? { categoryName: cat.name, categorySlug: cat.slug } : {}),
      };
    });
    save(PRODS_KEY, updated);
    return updated.find(p => p.id === id)!;
  },
  delete(id: number) {
    save(PRODS_KEY, this.getAll().filter(p => p.id !== id));
  },
};

export const STORE_EVENT = "ero_store_update";
export function notifyUpdate() {
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
}
