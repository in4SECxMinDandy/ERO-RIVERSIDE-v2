import { AdminLayout } from "@/admin/layout/admin-layout";
import { useCmsListUsers, useCmsUpdateUserStatus, useCmsCreateUser } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useState } from "react";
import { UserPlus, Lock, Unlock, ShieldCheck, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const createUserSchema = z.object({
  username: z.string().min(3, "Tối thiểu 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  role: z.enum(["admin", "editor"]),
});

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useCmsListUsers();

  const statusMut = useCmsUpdateUserStatus({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/v1/cms/users"] });
        toast({ title: "Đã cập nhật trạng thái tài khoản" });
      }
    }
  });

  const createMut = useCmsCreateUser({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/v1/cms/users"] });
        toast({ title: "Tạo tài khoản thành công" });
        setShowForm(false);
        form.reset();
      },
      onError: () => {
        toast({ title: "Lỗi tạo tài khoản", variant: "destructive" });
      }
    }
  });

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { username: "", email: "", password: "", role: "editor" }
  });

  const onSubmit = (values: z.infer<typeof createUserSchema>) => {
    createMut.mutate({ data: values });
  };

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "locked" : "active";
    statusMut.mutate({ id, data: { status: newStatus } });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Quản Lý Tài Khoản CMS</h1>
          <p className="text-sm text-gray-500 mt-1">Tổng số: {data?.total || 0} tài khoản</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="rounded-none bg-primary">
          <UserPlus className="w-4 h-4 mr-2" /> Thêm tài khoản
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-primary mb-4">Tạo tài khoản mới</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="username" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-primary font-semibold">Tên đăng nhập</FormLabel>
                  <FormControl><Input className="rounded-none border-gray-300" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-primary font-semibold">Email</FormLabel>
                  <FormControl><Input type="email" className="rounded-none border-gray-300" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-primary font-semibold">Mật khẩu</FormLabel>
                  <FormControl><Input type="password" className="rounded-none border-gray-300" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider text-primary font-semibold">Vai trò</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-none border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin (toàn quyền)</SelectItem>
                      <SelectItem value="editor">Editor (giới hạn)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="col-span-2 flex gap-3 justify-end">
                <Button type="button" variant="outline" className="rounded-none" onClick={() => setShowForm(false)}>Hủy</Button>
                <Button type="submit" className="rounded-none bg-primary" disabled={createMut.isPending}>
                  {createMut.isPending ? "Đang tạo..." : "Tạo tài khoản"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}

      <div className="bg-white border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên đăng nhập</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Lần đăng nhập cuối</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8">Đang tải...</TableCell></TableRow>
            ) : data?.users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-primary">{user.username}</TableCell>
                <TableCell className="text-sm text-gray-600">{user.email}</TableCell>
                <TableCell>
                  {user.role === "admin" ? (
                    <span className="text-xs font-bold text-red-600">ADMIN</span>
                  ) : (
                    <span className="text-xs font-bold text-blue-600">EDITOR</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className={`text-xs font-bold ${user.status === "active" ? "text-green-600" : "text-red-500"}`}>
                    {user.status === "active" ? "Hoạt động" : "Đã khóa"}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-gray-500">
                  {(user as any).lastLoginAt ? format(new Date((user as any).lastLoginAt), "dd/MM/yyyy HH:mm") : "Chưa đăng nhập"}
                </TableCell>
                <TableCell className="text-xs text-gray-500">{format(new Date(user.createdAt), "dd/MM/yyyy")}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={user.status === "active" ? "text-orange-500 hover:text-orange-700" : "text-green-500 hover:text-green-700"}
                    onClick={() => handleToggleStatus(user.id, user.status)}
                    title={user.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                  >
                    {user.status === "active" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200">
        <h3 className="text-sm font-bold text-amber-800 mb-2">Phân quyền hệ thống</h3>
        <div className="grid grid-cols-2 gap-4 text-xs text-amber-700">
          <div>
            <p className="font-bold mb-1 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> ADMIN</p>
            <ul className="space-y-0.5 list-disc list-inside">
              <li>Tạo, xóa dự án</li>
              <li>Xóa sản phẩm, media</li>
              <li>Xuất dữ liệu CSV</li>
              <li>Quản lý tài khoản CMS</li>
              <li>Xem nhật ký hệ thống</li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-1 flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> EDITOR</p>
            <ul className="space-y-0.5 list-disc list-inside">
              <li>Cập nhật nội dung dự án</li>
              <li>Tạo và cập nhật sản phẩm</li>
              <li>Upload media</li>
              <li>Xem danh sách khách hàng</li>
              <li>Cập nhật trạng thái lead</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
