import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  categoryStore,
  productStore,
  notifyUpdate,
  STORE_EVENT,
} from "@/lib/mock-store";

const SESSION_KEY = "ero_admin_session";
const MOCK_ADMIN = { id: 1, username: "admin", role: "admin" };
const MOCK_CREDENTIALS = { username: "admin", password: "admin123" };

type MutationOptions<TData = unknown, TError = Error> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
};

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function setSession(user: typeof MOCK_ADMIN | null) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}

function useStoreSubscription(queryClient: ReturnType<typeof useQueryClient>, keys: string[][]) {
  useEffect(() => {
    const handler = () => keys.forEach(k => queryClient.invalidateQueries({ queryKey: k }));
    window.addEventListener(STORE_EVENT, handler);
    return () => window.removeEventListener(STORE_EVENT, handler);
  }, [queryClient]);
}

function delay(ms = 120) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Categories ────────────────────────────────────────────────────────────

export function useListProjectCategories(_projectSlug?: string) {
  const qc = useQueryClient();
  useStoreSubscription(qc, [["categories"]]);
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      await delay();
      const categories = categoryStore.getAll();
      return { categories, total: categories.length };
    },
  });
}

export function useCmsListCategories() {
  const qc = useQueryClient();
  useStoreSubscription(qc, [["cms-categories"], ["categories"]]);
  return useQuery({
    queryKey: ["cms-categories"],
    queryFn: async () => {
      await delay();
      const categories = categoryStore.getAll();
      return { categories, total: categories.length };
    },
  });
}

export function useCmsCreateCategory(opts?: { mutation?: MutationOptions }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: unknown) => {
      await delay();
      const data = (payload && typeof payload === "object" && "data" in payload)
        ? (payload as { data: unknown }).data
        : payload;
      const item = categoryStore.create(data as any);
      notifyUpdate();
      return item;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["cms-categories"] });
      opts?.mutation?.onSuccess?.(data);
    },
    onError: (err) => opts?.mutation?.onError?.(err as Error),
  });
}

export function useCmsUpdateCategory(opts?: { mutation?: MutationOptions }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: unknown) => {
      await delay();
      const { id, data } = payload as { id: number; data: unknown };
      const item = categoryStore.update(id, data as any);
      notifyUpdate();
      return item;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["cms-categories"] });
      opts?.mutation?.onSuccess?.(data);
    },
    onError: (err) => opts?.mutation?.onError?.(err as Error),
  });
}

export function useCmsDeleteCategory(opts?: { mutation?: MutationOptions }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: unknown) => {
      await delay();
      const id = typeof payload === "object" && payload !== null && "id" in payload
        ? (payload as { id: number }).id
        : (payload as number);
      categoryStore.delete(id);
      notifyUpdate();
      return { id };
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["cms-categories"] });
      opts?.mutation?.onSuccess?.(data);
    },
    onError: (err) => opts?.mutation?.onError?.(err as Error),
  });
}

// ─── Products ──────────────────────────────────────────────────────────────

export function useListProducts(params?: Record<string, unknown>) {
  const qc = useQueryClient();
  useStoreSubscription(qc, [["products"]]);
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      await delay();
      let products = productStore.getAll();

      if (params?.search) {
        const q = String(params.search).toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(q));
      }
      if (params?.categorySlug) {
        products = products.filter(p => p.categorySlug === params.categorySlug);
      }
      if (params?.status) {
        products = products.filter(p => p.status === params.status);
      }
      if (params?.minPrice) {
        products = products.filter(p => p.price >= Number(params.minPrice));
      }
      if (params?.maxPrice) {
        products = products.filter(p => p.price <= Number(params.maxPrice));
      }

      return { products, total: products.length };
    },
  });
}

export function useGetProduct(id: string | number) {
  const qc = useQueryClient();
  useStoreSubscription(qc, [["product", id]]);
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      await delay();
      const product = productStore.getById(Number(id));
      if (!product) throw new Error("Không tìm thấy sản phẩm");
      return product;
    },
    enabled: !!id,
  });
}

export function useCmsCreateProduct(opts?: { mutation?: MutationOptions }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: unknown) => {
      await delay();
      const data = (payload && typeof payload === "object" && "data" in payload)
        ? (payload as { data: unknown }).data
        : payload;
      const item = productStore.create(data as any);
      notifyUpdate();
      return item;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      opts?.mutation?.onSuccess?.(data);
    },
    onError: (err) => opts?.mutation?.onError?.(err as Error),
  });
}

export function useCmsUpdateProduct(opts?: { mutation?: MutationOptions }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: unknown) => {
      await delay();
      const { id, data } = payload as { id: number; data: unknown };
      const item = productStore.update(id, data as any);
      notifyUpdate();
      return item;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      opts?.mutation?.onSuccess?.(data);
    },
    onError: (err) => opts?.mutation?.onError?.(err as Error),
  });
}

export function useCmsDeleteProduct(opts?: { mutation?: MutationOptions }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: unknown) => {
      await delay();
      const id = typeof payload === "object" && payload !== null && "id" in payload
        ? (payload as { id: number }).id
        : (payload as number);
      productStore.delete(id);
      notifyUpdate();
      return { id };
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      opts?.mutation?.onSuccess?.(data);
    },
    onError: (err) => opts?.mutation?.onError?.(err as Error),
  });
}

export function useCmsUpdateProductStatus(opts?: { mutation?: MutationOptions }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: unknown) => {
      await delay();
      const { id, data } = payload as { id: number; data: { status: string } };
      const item = productStore.update(id, { status: data.status as any });
      notifyUpdate();
      return item;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["products"] });
      opts?.mutation?.onSuccess?.(data);
    },
    onError: (err) => opts?.mutation?.onError?.(err as Error),
  });
}

// ─── Media (stub only - no backend) ────────────────────────────────────────

export function useListMedia(_params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["media"],
    queryFn: async () => ({ media: [], total: 0 }),
  });
}

export function useCmsCreateMedia(opts?: { mutation?: MutationOptions }) {
  return useMutation({
    mutationFn: async () => { await delay(); return {}; },
    onSuccess: (d) => opts?.mutation?.onSuccess?.(d),
    onError: (e) => opts?.mutation?.onError?.(e as Error),
  });
}

export function useCmsDeleteMedia(opts?: { mutation?: MutationOptions }) {
  return useMutation({
    mutationFn: async () => { await delay(); return {}; },
    onSuccess: (d) => opts?.mutation?.onSuccess?.(d),
    onError: (e) => opts?.mutation?.onError?.(e as Error),
  });
}

// ─── Registrations / Leads ─────────────────────────────────────────────────

export function useCreateRegistration(opts?: { mutation?: MutationOptions }) {
  return useMutation({
    mutationFn: async (_data: unknown) => { await delay(400); return { success: true }; },
    onSuccess: (d) => opts?.mutation?.onSuccess?.(d),
    onError: (e) => opts?.mutation?.onError?.(e as Error),
  });
}

export function useCmsListLeads(_params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => ({ leads: [], total: 0 }),
  });
}

export function useCmsUpdateLeadStatus(opts?: { mutation?: MutationOptions }) {
  return useMutation({
    mutationFn: async () => { await delay(); return {}; },
    onSuccess: (d) => opts?.mutation?.onSuccess?.(d),
    onError: (e) => opts?.mutation?.onError?.(e as Error),
  });
}

export function useCmsDeleteLead(opts?: { mutation?: MutationOptions }) {
  return useMutation({
    mutationFn: async () => { await delay(); return {}; },
    onSuccess: (d) => opts?.mutation?.onSuccess?.(d),
    onError: (e) => opts?.mutation?.onError?.(e as Error),
  });
}

export async function cmsExportLeads() {
  return new Blob([""], { type: "text/csv" });
}

// ─── Audit Logs / Data Exports ─────────────────────────────────────────────

export function useCmsListAuditLogs(_params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["audit-logs"],
    queryFn: async () => ({ logs: [], total: 0 }),
  });
}

export function useCmsListDataExports(_params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["data-exports"],
    queryFn: async () => ({ exports: [], total: 0 }),
  });
}

// ─── Users ─────────────────────────────────────────────────────────────────

export function useCmsListUsers(_params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => ({
      users: [MOCK_ADMIN],
      total: 1,
    }),
  });
}

export function useCmsUpdateUserStatus(opts?: { mutation?: MutationOptions }) {
  return useMutation({
    mutationFn: async () => { await delay(); return {}; },
    onSuccess: (d) => opts?.mutation?.onSuccess?.(d),
    onError: (e) => opts?.mutation?.onError?.(e as Error),
  });
}

export function useCmsCreateUser(opts?: { mutation?: MutationOptions }) {
  return useMutation({
    mutationFn: async () => { await delay(); return {}; },
    onSuccess: (d) => opts?.mutation?.onSuccess?.(d),
    onError: (e) => opts?.mutation?.onError?.(e as Error),
  });
}

// ─── Admin Auth ────────────────────────────────────────────────────────────

export function useGetAdminMe() {
  return useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      const session = getSession();
      if (!session) throw new Error("Not authenticated");
      return session;
    },
    retry: false,
  });
}

export function useAdminLogin(opts?: { mutation?: MutationOptions }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: unknown) => {
      const body = (payload && typeof payload === "object" && "data" in payload)
        ? (payload as { data: unknown }).data
        : payload;
      const { username, password } = body as { username: string; password: string };
      await new Promise(r => setTimeout(r, 400));
      if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
        setSession(MOCK_ADMIN);
        return MOCK_ADMIN;
      }
      throw new Error("Sai tài khoản hoặc mật khẩu");
    },
    onSuccess: (data) => {
      qc.setQueryData(["admin-me"], data);
      opts?.mutation?.onSuccess?.(data);
    },
    onError: (err) => opts?.mutation?.onError?.(err as Error),
  });
}

export function useAdminLogout(opts?: { mutation?: MutationOptions }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await new Promise(r => setTimeout(r, 200));
      setSession(null);
      return {};
    },
    onSuccess: (data) => {
      qc.setQueryData(["admin-me"], null);
      qc.invalidateQueries({ queryKey: ["admin-me"] });
      opts?.mutation?.onSuccess?.(data);
    },
    onError: (err) => opts?.mutation?.onError?.(err as Error),
  });
}
