import { useState } from "react";
import { AdminLayout } from "@/admin/layout/admin-layout";
import { useListMedia, useCmsCreateMedia, useCmsDeleteMedia } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Play, Eye, EyeOff, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Bắt buộc"),
  type: z.enum(["image", "video"]),
  url: z.string().min(1, "Bắt buộc"),
  category: z.string().min(1, "Bắt buộc"),
  visibility: z.enum(["public", "private", "vip"]),
  isPublic: z.boolean(),
  description: z.string().optional()
});

const VISIBILITY_LABELS: Record<string, { label: string; icon: any; class: string }> = {
  public: { label: "Công khai", icon: Eye, class: "bg-green-50 text-green-700 border-green-200" },
  private: { label: "Riêng tư", icon: EyeOff, class: "bg-orange-50 text-orange-700 border-orange-200" },
  vip: { label: "VIP", icon: Lock, class: "bg-purple-50 text-purple-700 border-purple-200" },
};

export default function AdminMedia() {
  const [filterVisibility, setFilterVisibility] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const { data, isLoading } = useListMedia({});
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "", type: "image", url: "", category: "Phối cảnh",
      visibility: "public", isPublic: true, description: ""
    }
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["/api/v1/media"] });

  const createMut = useCmsCreateMedia({
    mutation: {
      onSuccess: () => { invalidate(); setIsOpen(false); toast({ title: "Đã thêm media" }); form.reset(); }
    }
  });

  const deleteMut = useCmsDeleteMedia({
    mutation: { onSuccess: () => { invalidate(); toast({ title: "Đã xóa media" }); } }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createMut.mutate({ data: { ...values, isPublic: values.visibility === "public" } as any });
  };

  const filteredMedia = data?.media?.filter(m => {
    const visMatch = filterVisibility === "all" || m.visibility === filterVisibility;
    const typeMatch = filterType === "all" || m.type === filterType;
    return visMatch && typeMatch;
  }) || [];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Quản lý Media</h1>
          <p className="text-sm text-gray-500 mt-1">Tổng: {data?.total || 0} file media</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 rounded-none">
              <Plus className="w-4 h-4 mr-2" /> Thêm media
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-none">
            <DialogHeader><DialogTitle>Thêm Media Mới</DialogTitle></DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Tiêu đề</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="image">Hình ảnh</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Phối cảnh">Phối cảnh</SelectItem>
                          <SelectItem value="Mặt bằng">Mặt bằng</SelectItem>
                          <SelectItem value="Tiện ích">Tiện ích</SelectItem>
                          <SelectItem value="Thực tế">Thực tế</SelectItem>
                          <SelectItem value="Nội thất">Nội thất</SelectItem>
                          <SelectItem value="Video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="url" render={({ field }) => (
                  <FormItem><FormLabel>URL (Link ảnh hoặc YouTube Embed)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="visibility" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quyền truy cập</FormLabel>
                    <Select onValueChange={(val) => {
                      field.onChange(val);
                      form.setValue("isPublic", val === "public");
                    }} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="public">Công khai — mọi người đều thấy</SelectItem>
                        <SelectItem value="private">Riêng tư — chỉ KH đã đặt cọc</SelectItem>
                        <SelectItem value="vip">VIP — chỉ nội bộ</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Ghi chú</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                )} />
                <Button type="submit" className="w-full bg-primary rounded-none" disabled={createMut.isPending}>
                  {createMut.isPending ? "Đang lưu..." : "Lưu"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="flex gap-1">
          {["all", "image", "video"].map(t => (
            <Button key={t} size="sm" variant={filterType === t ? "default" : "outline"} className="rounded-none" onClick={() => setFilterType(t)}>
              {t === "all" ? "Tất cả" : t === "image" ? "Hình ảnh" : "Video"}
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          {["all", "public", "private", "vip"].map(v => (
            <Button key={v} size="sm" variant={filterVisibility === v ? "default" : "outline"} className="rounded-none" onClick={() => setFilterVisibility(v)}>
              {v === "all" ? "Tất cả" : VISIBILITY_LABELS[v]?.label}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Đang tải...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredMedia.map((m) => {
            const vis = VISIBILITY_LABELS[m.visibility] || VISIBILITY_LABELS.public;
            const VisIcon = vis.icon;
            return (
              <div key={m.id} className="group relative aspect-square bg-gray-100 border border-gray-200 overflow-hidden">
                <img
                  src={m.url.startsWith("http") && !m.url.includes("youtube") ? m.url : `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=60`}
                  className="w-full h-full object-cover"
                  alt={m.title}
                />
                {m.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="text-white w-8 h-8" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 border ${vis.class}`}>
                    <VisIcon className="w-3 h-3" /> {vis.label}
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                  <p className="text-white font-bold text-center text-sm">{m.title}</p>
                  <p className="text-accent text-xs mt-1">{m.category}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-4 rounded-none"
                    onClick={() => { if (confirm("Xóa media này?")) deleteMut.mutate({ id: m.id }); }}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Xóa
                  </Button>
                </div>
              </div>
            );
          })}
          {filteredMedia.length === 0 && (
            <div className="col-span-4 text-center py-16 text-gray-500 border border-dashed border-gray-200">
              Không có file media nào
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
