import { useState } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import {
  useListProducts, useCmsCreateProduct, useCmsUpdateProduct, useCmsDeleteProduct,
  useCmsUpdateProductStatus, useListProjectCategories
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Bắt buộc"),
  categoryId: z.coerce.number().min(1, "Chọn danh mục"),
  description: z.string().min(1, "Bắt buộc"),
  area: z.coerce.number().min(1),
  price: z.coerce.number().min(0.1),
  status: z.enum(["available", "sold", "reserved"]),
  floor: z.coerce.number().optional().nullable(),
  bedrooms: z.coerce.number().optional().nullable(),
  bathrooms: z.coerce.number().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  featuresString: z.string()
});

const STATUS_LABELS: Record<string, string> = {
  available: "Còn hàng",
  reserved: "Giữ chỗ",
  sold: "Đã bán",
};

const STATUS_CLASSES: Record<string, string> = {
  available: "bg-green-500",
  reserved: "bg-yellow-500",
  sold: "bg-red-500",
};

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { data, isLoading } = useListProducts({ search: search || undefined });
  const { data: categoriesData } = useListProjectCategories("ero-riverside");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", categoryId: 0, description: "", area: 100, price: 10,
      status: "available", featuresString: "", floor: null, bedrooms: null, bathrooms: null, imageUrl: null
    }
  });

  const invalidateKeys = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/v1/products"] });
  };

  const createMut = useCmsCreateProduct({
    mutation: { onSuccess: () => { invalidateKeys(); setIsModalOpen(false); toast({ title: "Đã thêm sản phẩm" }); } }
  });

  const updateMut = useCmsUpdateProduct({
    mutation: { onSuccess: () => { invalidateKeys(); setIsModalOpen(false); toast({ title: "Đã cập nhật" }); } }
  });

  const deleteMut = useCmsDeleteProduct({
    mutation: { onSuccess: () => { invalidateKeys(); toast({ title: "Đã xóa sản phẩm" }); } }
  });

  const statusMut = useCmsUpdateProductStatus({
    mutation: { onSuccess: () => { invalidateKeys(); toast({ title: "Đã cập nhật trạng thái" }); } }
  });

  const openAdd = () => {
    setEditingId(null);
    const firstCatId = categoriesData?.categories?.[0]?.id || 0;
    form.reset({ name: "", categoryId: firstCatId, description: "", area: 100, price: 10, status: "available", featuresString: "", floor: null, bedrooms: null, bathrooms: null, imageUrl: null });
    setIsModalOpen(true);
  };

  const openEdit = (p: any) => {
    setEditingId(p.id);
    form.reset({
      name: p.name,
      categoryId: p.categoryId,
      description: p.description,
      area: parseFloat(p.area),
      price: parseFloat(p.price),
      status: p.status as any,
      floor: p.floor,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      imageUrl: p.imageUrl,
      featuresString: p.features?.join(", ") || ""
    });
    setIsModalOpen(true);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const features = values.featuresString.split(",").map(s => s.trim()).filter(Boolean);
    const payload: any = {
      categoryId: values.categoryId,
      projectId: 1,
      name: values.name,
      description: values.description,
      area: values.area,
      price: values.price,
      status: values.status,
      floor: values.floor || null,
      bedrooms: values.bedrooms || null,
      bathrooms: values.bathrooms || null,
      imageUrl: values.imageUrl || null,
      features,
    };

    if (editingId) {
      updateMut.mutate({ id: editingId, data: payload });
    } else {
      createMut.mutate({ data: payload });
    }
  };

  const products = data?.products?.filter(p =>
    (categoryFilter === "all" || p.categorySlug === categoryFilter)
  ) || [];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Quản lý Sản Phẩm</h1>
          <p className="text-sm text-gray-500 mt-1">Tổng: {data?.total || 0} sản phẩm</p>
        </div>
        <Button onClick={openAdd} className="bg-accent hover:bg-accent/90 rounded-none">
          <Plus className="w-4 h-4 mr-2" /> Thêm mới
        </Button>
      </div>

      <div className="bg-white p-4 border border-gray-200 mb-6 flex gap-4 flex-wrap">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm tên sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-none"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={categoryFilter === "all" ? "default" : "outline"}
            size="sm"
            className="rounded-none"
            onClick={() => setCategoryFilter("all")}
          >Tất cả</Button>
          {categoriesData?.categories?.map(cat => (
            <Button
              key={cat.id}
              variant={categoryFilter === cat.slug ? "default" : "outline"}
              size="sm"
              className="rounded-none"
              onClick={() => setCategoryFilter(cat.slug)}
            >{cat.name}</Button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Mã</TableHead>
              <TableHead>Tên SP</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>DT (m²)</TableHead>
              <TableHead>Giá (Tỷ)</TableHead>
              <TableHead>Phòng ngủ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={8} className="text-center py-8">Đang tải...</TableCell></TableRow>
            ) : products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs text-gray-500">{p.id}</TableCell>
                <TableCell className="font-medium text-primary">{p.name}</TableCell>
                <TableCell>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 text-xs">{p.categoryName}</span>
                </TableCell>
                <TableCell className="text-sm">{p.area}</TableCell>
                <TableCell className="font-semibold text-sm">{p.price}</TableCell>
                <TableCell className="text-sm">{p.bedrooms ? `${p.bedrooms} PN` : "-"}</TableCell>
                <TableCell>
                  <Select value={p.status} onValueChange={(val) => statusMut.mutate({ id: p.id, data: { status: val } })}>
                    <SelectTrigger className={`rounded-none text-white text-xs h-7 w-28 border-0 ${STATUS_CLASSES[p.status] || "bg-gray-500"}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_LABELS).map(([val, label]) => (
                        <SelectItem key={val} value={val}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(p)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => { if (confirm("Xóa sản phẩm này?")) deleteMut.mutate({ id: p.id }); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && products.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center py-8 text-gray-500">Chưa có sản phẩm</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl rounded-none">
          <DialogHeader>
            <DialogTitle>{editingId ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel>Tên sản phẩm</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="categoryId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <Select onValueChange={field.onChange} value={String(field.value)}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Chọn danh mục" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {categoriesData?.categories?.map(cat => (
                          <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="available">Còn hàng</SelectItem>
                        <SelectItem value="reserved">Giữ chỗ</SelectItem>
                        <SelectItem value="sold">Đã bán</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
                <FormField control={form.control} name="area" render={({ field }) => (
                  <FormItem><FormLabel>Diện tích (m²)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem><FormLabel>Giá (Tỷ VND)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="floor" render={({ field }) => (
                  <FormItem><FormLabel>Số tầng</FormLabel><FormControl><Input type="number" {...field} value={field.value || ""} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="bedrooms" render={({ field }) => (
                  <FormItem><FormLabel>Phòng ngủ</FormLabel><FormControl><Input type="number" {...field} value={field.value || ""} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="bathrooms" render={({ field }) => (
                  <FormItem><FormLabel>Phòng tắm</FormLabel><FormControl><Input type="number" {...field} value={field.value || ""} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel>URL Hình ảnh</FormLabel><FormControl><Input {...field} value={field.value || ""} /></FormControl></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Mô tả</FormLabel><FormControl><Textarea className="resize-none" rows={3} {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="featuresString" render={({ field }) => (
                <FormItem><FormLabel>Tiện ích (cách nhau dấu phẩy)</FormLabel><FormControl><Input placeholder="Hồ bơi, sân vườn, garare..." {...field} /></FormControl></FormItem>
              )} />
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" className="rounded-none" onClick={() => setIsModalOpen(false)}>Hủy</Button>
                <Button type="submit" className="bg-primary text-white rounded-none" disabled={createMut.isPending || updateMut.isPending}>
                  {createMut.isPending || updateMut.isPending ? "Lưu..." : "Lưu"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
