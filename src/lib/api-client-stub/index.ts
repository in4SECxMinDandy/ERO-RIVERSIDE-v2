import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE = "/api";

async function fetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useListProducts(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchJson(`${API_BASE}/products`),
    placeholderData: { products: [], total: 0 },
  });
}

export function useGetProduct(id: string | number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchJson(`${API_BASE}/products/${id}`),
    enabled: !!id,
  });
}

export function useCmsCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) =>
      fetchJson(`${API_BASE}/cms/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useCmsUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number; [k: string]: unknown }) =>
      fetchJson(`${API_BASE}/cms/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useCmsDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetchJson(`${API_BASE}/cms/products/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useCmsUpdateProductStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      fetchJson(`${API_BASE}/cms/products/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useListProjectCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchJson(`${API_BASE}/categories`),
    placeholderData: { categories: [] },
  });
}

export function useCmsListCategories() {
  return useQuery({
    queryKey: ["cms-categories"],
    queryFn: () => fetchJson(`${API_BASE}/cms/categories`),
    placeholderData: { categories: [] },
  });
}

export function useCmsCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) =>
      fetchJson(`${API_BASE}/cms/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-categories"] }),
  });
}

export function useCmsUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number; [k: string]: unknown }) =>
      fetchJson(`${API_BASE}/cms/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-categories"] }),
  });
}

export function useCmsDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetchJson(`${API_BASE}/cms/categories/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms-categories"] }),
  });
}

export function useListMedia(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["media", params],
    queryFn: () => fetchJson(`${API_BASE}/media`),
    placeholderData: { media: [], total: 0 },
  });
}

export function useCmsCreateMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) =>
      fetchJson(`${API_BASE}/cms/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["media"] }),
  });
}

export function useCmsDeleteMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetchJson(`${API_BASE}/cms/media/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["media"] }),
  });
}

export function useCreateRegistration() {
  return useMutation({
    mutationFn: (data: unknown) =>
      fetchJson(`${API_BASE}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
  });
}

export function useGetAdminMe() {
  return useQuery({
    queryKey: ["admin-me"],
    queryFn: () => fetchJson(`${API_BASE}/admin/me`),
    retry: false,
  });
}

export function useAdminLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) =>
      fetchJson(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-me"] }),
  });
}

export function useAdminLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetchJson(`${API_BASE}/admin/logout`, { method: "POST" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-me"] }),
  });
}

export function useCmsListLeads(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["leads", params],
    queryFn: () => fetchJson(`${API_BASE}/cms/leads`),
    placeholderData: { leads: [], total: 0 },
  });
}

export function useCmsUpdateLeadStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      fetchJson(`${API_BASE}/cms/leads/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
  });
}

export function useCmsDeleteLead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      fetchJson(`${API_BASE}/cms/leads/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
  });
}

export async function cmsExportLeads() {
  const res = await fetch(`${API_BASE}/cms/leads/export`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.blob();
}

export function useCmsListAuditLogs(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["audit-logs", params],
    queryFn: () => fetchJson(`${API_BASE}/cms/audit-logs`),
    placeholderData: { logs: [], total: 0 },
  });
}

export function useCmsListDataExports(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["data-exports", params],
    queryFn: () => fetchJson(`${API_BASE}/cms/data-exports`),
    placeholderData: { exports: [], total: 0 },
  });
}

export function useCmsListUsers(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchJson(`${API_BASE}/cms/users`),
    placeholderData: { users: [], total: 0 },
  });
}

export function useCmsUpdateUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      fetchJson(`${API_BASE}/cms/users/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useCmsCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) =>
      fetchJson(`${API_BASE}/cms/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}
