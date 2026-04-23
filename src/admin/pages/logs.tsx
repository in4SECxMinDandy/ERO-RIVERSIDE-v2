import { AdminLayout } from "@/admin/layout/admin-layout";
import { useCmsListAuditLogs, useCmsListDataExports } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardList, Download } from "lucide-react";

const ACTION_COLORS: Record<string, string> = {
  create: "text-green-600",
  update: "text-blue-600",
  delete: "text-red-600",
  login: "text-purple-600",
  logout: "text-gray-500",
  export: "text-orange-600",
  system: "text-gray-400",
};

const ACTION_LABELS: Record<string, string> = {
  create: "TẠO MỚI",
  update: "CẬP NHẬT",
  delete: "XÓA",
  login: "ĐĂNG NHẬP",
  logout: "ĐĂNG XUẤT",
  export: "XUẤT DỮ LIỆU",
  system: "HỆ THỐNG",
};

export default function AdminLogs() {
  const [tab, setTab] = useState<"audit" | "exports">("audit");
  const { data, isLoading } = useCmsListAuditLogs();
  const { data: exportsData, isLoading: exportsLoading } = useCmsListDataExports();

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Nhật Ký & Kiểm Toán</h1>
        <p className="text-sm text-gray-500 mt-1">Theo dõi toàn bộ hoạt động và xuất dữ liệu trên hệ thống</p>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          variant={tab === "audit" ? "default" : "outline"}
          onClick={() => setTab("audit")}
          className="rounded-none"
        >
          <ClipboardList className="w-4 h-4 mr-2" /> Nhật ký hoạt động ({data?.total || 0})
        </Button>
        <Button
          variant={tab === "exports" ? "default" : "outline"}
          onClick={() => setTab("exports")}
          className="rounded-none"
        >
          <Download className="w-4 h-4 mr-2" /> Lịch sử xuất dữ liệu ({exportsData?.total || 0})
        </Button>
      </div>

      {tab === "audit" ? (
        <div className="bg-white border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Thời gian</TableHead>
                <TableHead className="w-[120px]">Hành động</TableHead>
                <TableHead className="w-[120px]">Đối tượng</TableHead>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Chi tiết</TableHead>
                <TableHead className="w-[120px]">IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">Đang tải...</TableCell></TableRow>
              ) : data?.logs?.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs text-gray-500 font-mono">
                    {format(new Date(log.createdAt), "dd/MM/yyyy HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs font-bold ${ACTION_COLORS[log.actionType] || "text-gray-600"}`}>
                      {ACTION_LABELS[log.actionType] || log.actionType.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700 text-xs uppercase">{log.entityType}</TableCell>
                  <TableCell className="text-xs text-gray-500 font-mono">{log.entityId || "-"}</TableCell>
                  <TableCell className="text-sm text-gray-600">{log.description}</TableCell>
                  <TableCell className="text-xs text-gray-400 font-mono">{log.ipAddress || "-"}</TableCell>
                </TableRow>
              ))}
              {!isLoading && (!data?.logs || data.logs.length === 0) && (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-500">Chưa có nhật ký</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-white border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thời gian</TableHead>
                <TableHead>Loại xuất</TableHead>
                <TableHead>Bộ lọc áp dụng</TableHead>
                <TableHead>Người xuất</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exportsLoading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-8">Đang tải...</TableCell></TableRow>
              ) : exportsData?.exports?.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell className="text-xs text-gray-500 font-mono">
                    {format(new Date(exp.createdAt), "dd/MM/yyyy HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <span className="bg-orange-50 text-orange-700 border border-orange-100 text-xs px-2 py-1 font-semibold">
                      {exp.exportType === "lead_list" ? "Danh sách khách hàng" : exp.exportType}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-gray-500 font-mono">{exp.filtersJson || "{}"}</TableCell>
                  <TableCell className="text-sm">User #{exp.exportedBy || "?"}</TableCell>
                </TableRow>
              ))}
              {!exportsLoading && (!exportsData?.exports || exportsData.exports.length === 0) && (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-gray-500">Chưa có lịch sử xuất dữ liệu</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
}
