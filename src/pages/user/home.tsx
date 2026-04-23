import { PublicLayout } from "@/components/layout/public-layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { useListProducts } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Maximize, ArrowRight, ShieldCheck, TreePine, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: productsData } = useListProducts({ limit: 3 } as any); // Assuming limit is possible, otherwise slice
  const featuredProducts = productsData?.products?.slice(0, 3) || [];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="ERO Riverside"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-accent font-semibold tracking-[0.3em] uppercase text-sm md:text-base mb-6 block">
              Chủ đầu tư: Công ty Cổ phần Thiên Đức
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              Khu Đô Thị <span className="gold-gradient-text">Nam Từ Sơn</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Khu đô thị hiện đại tại Phường Phù Chẩn, TP. Từ Sơn, Bắc Ninh — 
              20,88 ha quy hoạch đồng bộ, hạ tầng chuẩn đô thị, pháp lý minh bạch.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-base px-8 py-6 rounded-none uppercase tracking-wider bg-transparent transition-all duration-300 w-full sm:w-auto">
                  Nhận Báo Giá
                </Button>
              </Link>
              <Link href="/map">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-base px-8 py-6 rounded-none uppercase tracking-wider bg-transparent transition-all duration-300 w-full sm:w-auto">
                  Xem Sa Bàn
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {[
              { label: "Tổng diện tích", value: "20,88 ha" },
              { label: "Mật độ xây dựng", value: "46,15%" },
              { label: "Số lượng sản phẩm", value: "411+ căn" },
              { label: "Pháp lý", value: "QH 1/500" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-500 uppercase tracking-wider text-xs md:text-sm font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-accent/10 translate-x-4 translate-y-4"></div>
              <img 
                src={`${import.meta.env.BASE_URL}images/about-model.png`} 
                alt="ERO Riverside Model" 
                className="relative z-10 w-full h-auto object-cover luxury-shadow"
              />
            </div>
            <div className="lg:w-1/2">
              <SectionHeading title="Tầm Nhìn & Vị Thế" subtitle="Tổng quan dự án" align="left" />
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Tọa lạc tại vị trí vàng, ERO Riverside tự hào là khu đô thị sinh thái kiểu mẫu, 
                  nơi hội tụ tinh hoa kiến trúc hiện đại và vẻ đẹp nguyên sơ của thiên nhiên. 
                  Với hơn 3km mặt tiền sông, dự án mang đến bầu không khí trong lành, vượng khí sinh tài cho gia chủ.
                </p>
                <p>
                  Được quy hoạch bài bản bởi các kiến trúc sư hàng đầu thế giới, mỗi phân khu tại ERO Riverside 
                  đều mang một dấu ấn riêng biệt, từ những căn biệt thự ven sông riêng tư tuyệt đối đến 
                  những dãy shophouse sầm uất, nhộn nhịp.
                </p>
                <ul className="space-y-3 mt-8">
                  {[
                    "Vị trí đắc địa, kết nối giao thông thuận tiện",
                    "Thiết kế kiến trúc tân cổ điển sang trọng",
                    "Hệ thống tiện ích nội khu đẳng cấp 5 sao",
                    "Cộng đồng cư dân tinh hoa, văn minh"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-primary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <SectionHeading title="Sản Phẩm Nổi Bật" subtitle="Bộ sưu tập tinh hoa" align="left" className="mb-0" />
            <Link href="/products" className="hidden md:flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors uppercase tracking-wider text-sm">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                className="group border border-gray-100 bg-white hover:luxury-shadow transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  {/* abstract generic real estate image via unsplash based on type */}
                  <img 
                    src={product.imageUrl || `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80`} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                      {product.categoryName}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 ${
                      product.status === 'available' ? 'bg-green-500 text-white' : 
                      product.status === 'sold' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                    }`}>
                      {product.status === 'available' ? 'Còn hàng' : product.status === 'sold' ? 'Đã bán' : 'Giữ chỗ'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-display text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Maximize className="w-4 h-4 text-accent" />
                      <span className="font-medium">{product.area} m²</span>
                    </div>
                    <div className="font-display font-bold text-xl text-primary">
                      {product.price} <span className="text-sm font-sans text-gray-500">tỷ VND</span>
                    </div>
                  </div>
                  
                  <Link href={`/products/${product.id}`}>
                    <Button variant="outline" className="w-full rounded-none border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-wider text-xs py-5">
                      Chi tiết sản phẩm
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/products">
              <Button variant="link" className="text-accent font-semibold uppercase tracking-wider">
                Xem tất cả sản phẩm <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <SectionHeading title="Tiện Ích Đẳng Cấp" subtitle="Trải nghiệm sống 5 sao" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative h-[400px] overflow-hidden group">
              <img 
                src={`${import.meta.env.BASE_URL}images/amenity-pool.png`} 
                alt="Infinity Pool" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end p-8">
                <div>
                  <Droplets className="w-8 h-8 text-accent mb-3" />
                  <h3 className="font-display text-2xl font-bold mb-2">Công Viên Trung Tâm & Đài Phun Nước</h3>
                  <p className="text-gray-300 text-sm">Công viên CX1 rộng 6.704m² với đài phun nước 1.256m² là trái tim của toàn khu đô thị.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-rows-2 gap-4">
               <div className="relative overflow-hidden group h-[192px] lg:h-auto">
                <img 
                  src={`${import.meta.env.BASE_URL}images/amenity-clubhouse.png`} 
                  alt="Clubhouse" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end p-6">
                  <div>
                    <ShieldCheck className="w-6 h-6 text-accent mb-2" />
                    <h3 className="font-display text-xl font-bold mb-1">Khu Văn Hóa Thể Thao</h3>
                    <p className="text-gray-300 text-xs">5.190m² gồm bể bơi, sân tennis và câu lạc bộ cư dân đẳng cấp.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden group h-[192px] lg:h-auto">
                {/* park path unsplash */}
                <img 
                  src="https://pixabay.com/get/g041f34ed18786da8754d086254ff4725ed8030b32d895727ce9ccc01cf797b01a1e9a478aebcb19901328d5b69124f43767b8ad3e60a0ab570fb8c7556ee8357_1280.jpg" 
                  alt="Công viên" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end p-6">
                  <div>
                    <TreePine className="w-6 h-6 text-accent mb-2" />
                    <h3 className="font-display text-xl font-bold mb-1">Cụm Công Viên Khu A & B</h3>
                    <p className="text-gray-300 text-xs">8.342m² công viên cây xanh phân bổ đều khắp toàn khu, tỷ lệ 7,81% diện tích.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
