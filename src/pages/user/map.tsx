import { PublicLayout } from "@/components/layout/public-layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { MapPin, Navigation, School, ShoppingBag, HeartPulse } from "lucide-react";

export default function MapPage() {
  return (
    <PublicLayout>
      <div className="bg-primary text-white py-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Vị Trí & Mặt Bằng</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">Tọa độ kim cương - Kết nối ngàn tiện ích</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <SectionHeading title="Vị Trí Độc Tôn" subtitle="Tâm điểm kết nối" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <div className="lg:col-span-2 h-[500px] bg-gray-100 luxury-shadow relative z-0">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14879.512!2d106.0227!3d21.1047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b3a3c2f56789%3A0xabcdef1234567890!2zUGjGsOG7nW5nIFBow7kgQ2jhuqVuLCBUUC4gVOG7qyBTxqFuLCBC4bqvYyBOaW5o!5e0!3m2!1svi!2s!4v1700000000001!5m2!1svi!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Project Location"
            ></iframe>
          </div>
          <div className="space-y-8 flex flex-col justify-center">
            <div className="bg-white p-8 luxury-shadow border-t-4 border-accent">
              <h3 className="font-display text-2xl font-bold text-primary mb-6">Kết nối giao thông</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="bg-primary/5 p-2 rounded-full"><Navigation className="w-5 h-5 text-accent" /></div>
                  <div>
                    <h4 className="font-semibold text-primary">5 Phút</h4>
                    <p className="text-sm text-gray-500">Đến trung tâm hành chính TP. Từ Sơn</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/5 p-2 rounded-full"><Navigation className="w-5 h-5 text-accent" /></div>
                  <div>
                    <h4 className="font-semibold text-primary">15 Phút</h4>
                    <p className="text-sm text-gray-500">Ra Quốc lộ 1A – cửa ngõ Hà Nội – Lạng Sơn</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/5 p-2 rounded-full"><Navigation className="w-5 h-5 text-accent" /></div>
                  <div>
                    <h4 className="font-semibold text-primary">25 Phút</h4>
                    <p className="text-sm text-gray-500">Đến trung tâm Hà Nội qua cầu Đông Trù</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary/5 p-2 rounded-full"><Navigation className="w-5 h-5 text-accent" /></div>
                  <div>
                    <h4 className="font-semibold text-primary">30 Phút</h4>
                    <p className="text-sm text-gray-500">Đến sân bay quốc tế Nội Bài</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <SectionHeading title="Mặt Bằng Tổng Thể" subtitle="Quy hoạch đồng bộ" />
        
        <div className="relative border border-gray-200 luxury-shadow p-2 bg-white mb-16 overflow-hidden group">
          <img 
            src={`${import.meta.env.BASE_URL}images/master-plan.png`} 
            alt="Master Plan" 
            className="w-full h-auto cursor-zoom-in group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 text-sm font-semibold text-primary shadow-lg flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" /> Sơ đồ phân khu chi tiết
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 border-l-4 border-accent">
            <School className="w-8 h-8 text-accent mb-4" />
            <h3 className="font-display font-bold text-xl text-primary mb-2">Giáo Dục</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Trường tiểu học 4.812m² ngay trong nội khu. Gần trường THCS, THPT Từ Sơn và các trường quốc tế khu vực Đông Anh.</p>
          </div>
          <div className="bg-gray-50 p-6 border-l-4 border-accent">
            <ShoppingBag className="w-8 h-8 text-accent mb-4" />
            <h3 className="font-display font-bold text-xl text-primary mb-2">Thương Mại</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Làng nghề gỗ Đồng Kỵ ngay cạnh dự án. Vincom Bắc Ninh và Trung tâm thương mại lớn trong bán kính 10km.</p>
          </div>
          <div className="bg-gray-50 p-6 border-l-4 border-accent">
            <HeartPulse className="w-8 h-8 text-accent mb-4" />
            <h3 className="font-display font-bold text-xl text-primary mb-2">Y Tế</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Bệnh viện Đa khoa tỉnh Bắc Ninh cách 10km. Bệnh viện Việt Đức, Bạch Mai tại Hà Nội trong 30 phút.</p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
