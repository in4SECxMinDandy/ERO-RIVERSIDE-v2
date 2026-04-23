import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/user/layout/public-layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Building2, TreePine, Car, School, CheckCircle2, ChevronRight, Landmark, Zap, Droplets, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const landUseData = [
  { type: "Đất xây dựng nhà ở", area: "96.364,0", pct: "46,15%", note: "Bao gồm thấp tầng và cao tầng", icon: Building2, color: "bg-accent" },
  { type: "Đất công trình công cộng", area: "15.837,4", pct: "7,58%", note: "Trường học, dịch vụ, văn phòng", icon: School, color: "bg-blue-500" },
  { type: "Đất cây xanh, vườn hoa", area: "16.303,3", pct: "7,81%", note: "Công viên trung tâm và khu vực", icon: TreePine, color: "bg-green-500" },
  { type: "Đất giao thông, HTKT", area: "80.315,3", pct: "38,46%", note: "Đường nội bộ và bãi xe", icon: Car, color: "bg-gray-500" },
];

const amenities = [
  { name: "Công viên trung tâm (CX1)", area: "6.704,3 m²", desc: "Không gian xanh trung tâm toàn khu" },
  { name: "Đài phun nước trung tâm", area: "1.256,6 m²", desc: "Điểm nhấn cảnh quan, biểu tượng khu đô thị" },
  { name: "Cụm công viên khu A (A1–A4)", area: "6.838,8 m²", desc: "Phân bổ đều 4 cụm nhỏ trong khu A" },
  { name: "Cụm công viên khu B (B7, B8)", area: "1.503,6 m²", desc: "Không gian xanh khu vực phía Bắc" },
  { name: "Khu văn hóa thể thao", area: "5.190,6 m²", desc: "Bể bơi, sân tennis, câu lạc bộ cư dân" },
  { name: "Trường tiểu học", area: "4.812,2 m²", desc: "Trường học 2–3 tầng ngay trong nội khu" },
  { name: "Công trình dịch vụ công cộng", area: "2.334,6 m²", desc: "Trung tâm dịch vụ đáp ứng sinh hoạt hàng ngày" },
];

const roads = [
  { code: "MC 1-1", label: "Trục chính", width: "24,0m", detail: "Lòng đường 15m, vỉa hè 4,5m × 2" },
  { code: "MC 2-2", label: "Trục phụ A", width: "15,5m", detail: "Lòng đường 7,5m, vỉa hè 4,0m × 2" },
  { code: "MC 3-3", label: "Trục phụ B", width: "13,5m", detail: "Lòng đường 7,5m, vỉa hè 3,0m × 2" },
  { code: "MC 4-4", label: "Đường nội khu A", width: "11,5m", detail: "Lòng đường 5,5m, vỉa hè 3,0m × 2" },
  { code: "MC 5-5", label: "Đường nội khu B", width: "10,0m", detail: "Lòng đường 5,5m, vỉa hè 2,25m × 2" },
];

const housing = [
  {
    code: "Mẫu C",
    name: "Nhà Phố / Nhà Vườn",
    count: 126,
    totalArea: "15.017,4 m²",
    size: "6 × 20m (120 m²)",
    floors: "3 – 4 tầng",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    color: "border-accent",
  },
  {
    code: "Mẫu B",
    name: "Biệt Thự Song Lập",
    count: 181,
    totalArea: "32.938,5 m²",
    size: "8,5 × 20m (170 m²)",
    floors: "3 tầng",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    color: "border-blue-500",
  },
  {
    code: "Mẫu A",
    name: "Biệt Thự Đơn Lập",
    count: 104,
    totalArea: "42.908,1 m²",
    size: "20–28 × 20m (400–560 m²)",
    floors: "3 tầng",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
    color: "border-yellow-500",
  },
  {
    code: "Cao tầng",
    name: "Chung Cư & Văn Phòng",
    count: 3,
    totalArea: "9.000 m²",
    size: "2 tòa CC (18T) + 1 tòa VP (24T)",
    floors: "18 – 24 tầng",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    color: "border-gray-500",
  },
];

const boundaries = [
  { dir: "Phía Bắc", desc: "Giáp Quốc lộ 1 mới (Hà Nội – Lạng Sơn)" },
  { dir: "Phía Nam", desc: "Giáp đất canh tác địa phương (xã Phù Chẩn)" },
  { dir: "Phía Đông", desc: "Giáp đường Tỉnh lộ 271" },
  { dir: "Phía Tây", desc: "Giáp hệ thống kênh tiêu và xã Ninh Hiệp (Hà Nội)" },
];

export default function AboutPage() {
  const { data: milestones } = useQuery({
    queryKey: ["milestones"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/projects/ero-riverside/milestones`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.milestones || [];
    },
  });

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="bg-primary text-white py-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Tổng Quan Dự Án</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">Khu đô thị mới Nam Từ Sơn (Giai đoạn I) – Công ty Cổ phần Thiên Đức</p>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-24">

        {/* 1. Thông tin định danh */}
        <section>
          <SectionHeading title="Thông Tin Dự Án" subtitle="Định danh & Ranh giới địa lý" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            <div className="space-y-4">
              {[
                { label: "Tên dự án", value: "Khu đô thị mới Nam Từ Sơn (Giai đoạn I)" },
                { label: "Chủ đầu tư", value: "Công ty Cổ phần Thiên Đức" },
                { label: "Vị trí", value: "Phường Phù Chẩn, TP. Từ Sơn, tỉnh Bắc Ninh" },
                { label: "Diện tích tổng quy hoạch", value: "208.820 m² (20,88 ha)" },
                { label: "Pháp lý", value: "Đã phê duyệt QH 1/500 (QĐ 65/2008)" },
                { label: "Tổng số sản phẩm", value: "411 căn thấp tầng + 2 tòa CC + 1 VP" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3 border-b border-gray-100 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="font-semibold text-primary">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-primary mb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-accent" /> Ranh giới địa lý
              </h3>
              <div className="space-y-3">
                {boundaries.map(({ dir, desc }) => (
                  <div key={dir} className="flex items-start gap-3 bg-gray-50 p-4 border-l-4 border-accent">
                    <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-primary mr-2">{dir}:</span>
                      <span className="text-gray-600 text-sm">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Danh mục sản phẩm */}
        <section>
          <SectionHeading title="Danh Mục Sản Phẩm" subtitle="Housing Portfolio" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
            {housing.map((h, i) => (
              <motion.div
                key={h.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white luxury-shadow border-t-4 ${h.color} overflow-hidden`}
              >
                <div className="h-48 overflow-hidden">
                  <img src={h.img} alt={h.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-accent font-bold uppercase tracking-widest">{h.code}</span>
                  <h3 className="font-display font-bold text-lg text-primary mt-1 mb-3">{h.name}</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li><span className="font-semibold">Số lượng:</span> {h.count} căn/tòa</li>
                    <li><span className="font-semibold">Tổng DT đất:</span> {h.totalArea}</li>
                    <li><span className="font-semibold">Kích thước lô:</span> {h.size}</li>
                    <li><span className="font-semibold">Tầng cao:</span> {h.floors}</li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. Thông số sử dụng đất */}
        <section>
          <SectionHeading title="Thông Số Sử Dụng Đất" subtitle="Quy hoạch chi tiết 1/500" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {landUseData.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 luxury-shadow border-b-4 border-accent"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-display font-bold text-primary mb-1">{item.pct}</p>
                  <p className="font-semibold text-gray-700 text-sm mb-1">{item.type}</p>
                  <p className="text-accent font-bold text-sm">{item.area} m²</p>
                  <p className="text-xs text-gray-400 mt-2">{item.note}</p>
                </motion.div>
              );
            })}
          </div>
          {/* Visual bar */}
          <div className="mt-6 bg-white p-6 luxury-shadow">
            <p className="text-sm text-gray-500 mb-3">Tổng cộng: 208.820 m²</p>
            <div className="flex h-8 rounded overflow-hidden">
              <div style={{ width: "46.15%" }} className="bg-accent flex items-center justify-center text-white text-xs font-bold">46,15%</div>
              <div style={{ width: "7.58%" }} className="bg-blue-500 flex items-center justify-center text-white text-xs font-bold">7,58%</div>
              <div style={{ width: "7.81%" }} className="bg-green-500 flex items-center justify-center text-white text-xs font-bold">7,81%</div>
              <div style={{ width: "38.46%" }} className="bg-gray-400 flex items-center justify-center text-white text-xs font-bold">38,46%</div>
            </div>
            <div className="flex gap-4 mt-3 flex-wrap text-xs text-gray-600">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-accent inline-block rounded-sm"></span>Nhà ở</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 inline-block rounded-sm"></span>Công trình CC</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 inline-block rounded-sm"></span>Cây xanh</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-400 inline-block rounded-sm"></span>Giao thông</span>
            </div>
          </div>
        </section>

        {/* 4. Hệ thống tiện ích */}
        <section>
          <SectionHeading title="Hệ Thống Tiện Ích" subtitle="Chi tiết diện tích từng hạng mục" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {amenities.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-white p-5 luxury-shadow flex gap-4 items-start border-l-4 border-accent"
              >
                <TreePine className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary text-sm">{a.name}</h4>
                  <p className="text-accent font-bold text-lg">{a.area}</p>
                  <p className="text-xs text-gray-400">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Quy chuẩn hạ tầng */}
        <section>
          <SectionHeading title="Quy Chuẩn Hạ Tầng" subtitle="Tiêu chuẩn kỹ thuật đồng bộ" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
            {/* Road specs */}
            <div>
              <h3 className="font-display font-bold text-xl text-primary mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-accent" /> Hệ thống đường giao thông
              </h3>
              <p className="text-sm text-gray-500 mb-4">Cao độ san nền trung bình: +5,10m. Hướng dốc từ Đông Bắc sang Tây Nam.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="p-3 text-left">Mặt cắt</th>
                      <th className="p-3 text-left">Loại đường</th>
                      <th className="p-3 text-left">Tổng rộng</th>
                      <th className="p-3 text-left">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roads.map((r, i) => (
                      <tr key={r.code} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-3 font-bold text-accent">{r.code}</td>
                        <td className="p-3 text-gray-700">{r.label}</td>
                        <td className="p-3 font-semibold text-primary">{r.width}</td>
                        <td className="p-3 text-gray-500 text-xs">{r.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Utilities */}
            <div>
              <h3 className="font-display font-bold text-xl text-primary mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" /> Hệ thống kỹ thuật
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Zap, title: "Cấp điện", desc: "Nguồn 35KV từ trạm trung gian khu vực, dẫn về 02 trạm biến áp xây mới trong khu đô thị." },
                  { icon: Droplets, title: "Cấp nước", desc: "Trạm cấp nước sạch công suất đảm bảo sinh hoạt cho toàn bộ cư dân và công trình trong khu." },
                  { icon: Trash2, title: "Thoát nước thải", desc: "Trạm xử lý nước thải riêng biệt tại phía Tây Nam, xử lý đạt chuẩn trước khi xả ra môi trường." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-gray-50 p-4 border-l-4 border-accent flex gap-4">
                    <Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-primary text-sm">{title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Lịch sử pháp lý */}
        <section>
          <SectionHeading title="Hồ Sơ Pháp Lý" subtitle="Lịch sử hình thành & phê duyệt" />
          <div className="mt-8 relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-accent/30"></div>
            <div className="space-y-6">
              {(milestones && milestones.length > 0 ? milestones : [
                { milestoneDate: "2002-11-12", title: "Phê duyệt quy hoạch chi tiết 1/500", description: "UBND tỉnh Bắc Ninh phê duyệt quy hoạch chi tiết tỷ lệ 1/500 cho Khu đô thị mới Nam Từ Sơn.", documentRef: "Quyết định 1220/QĐ-CT" },
                { milestoneDate: "2003-01-29", title: "Thu hồi đất & giao Công ty Thiên Đức", description: "Quyết định thu hồi 220.190m² đất và giao cho Công ty Cổ phần Thiên Đức, trong đó 20,88 ha dùng xây dựng khu đô thị.", documentRef: "Quyết định 147/QĐ-CT" },
                { milestoneDate: "2003-07-01", title: "Phê duyệt phương án bồi thường GPMB", description: "Phê duyệt phương án bồi thường giải phóng mặt bằng toàn khu với tổng kinh phí 10.522.412.330 VNĐ.", documentRef: "Quyết định 732/QĐ-CT" },
                { milestoneDate: "2008-03-12", title: "Điều chỉnh quy hoạch chi tiết (Hiện hành)", description: "Sở Xây dựng Bắc Ninh phê duyệt điều chỉnh quy hoạch, tăng chiều cao chung cư lên 18 tầng và văn phòng lên 24 tầng.", documentRef: "Quyết định 65/QĐ-SXD" },
              ]).map((m: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-16"
                >
                  <div className="absolute left-3 top-3 w-6 h-6 bg-accent rounded-full border-4 border-white shadow-md"></div>
                  <div className="bg-white p-6 luxury-shadow">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <span className="text-accent font-bold text-sm">
                        {new Date(m.milestoneDate).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </span>
                      <span className="bg-primary/5 text-primary text-xs px-3 py-1 font-semibold">{m.documentRef}</span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-primary mb-1">{m.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </PublicLayout>
  );
}
