import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// ─── User (Public) Pages ───────────────────────────────────────────────────
import Home from "@/user/pages/home";
import Products from "@/user/pages/products";
import ProductDetail from "@/user/pages/product-detail";
import Gallery from "@/user/pages/gallery";
import MapPage from "@/user/pages/map";
import AboutPage from "@/user/pages/about";
import Register from "@/user/pages/register";
import NotFound from "@/user/pages/not-found";

// ─── Admin Pages ───────────────────────────────────────────────────────────
import AdminLogin from "@/admin/pages/login";
import AdminDashboard from "@/admin/pages/dashboard";
import AdminCategories from "@/admin/pages/categories";
import AdminProducts from "@/admin/pages/products";
import AdminMedia from "@/admin/pages/media";
import AdminRegistrations from "@/admin/pages/registrations";
import AdminLogs from "@/admin/pages/logs";
import AdminUsers from "@/admin/pages/users";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  }
});

function Router() {
  return (
    <Switch>
      {/* ── Public Routes ─────────────────────────────── */}
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/map" component={MapPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/register" component={Register} />

      {/* ── Admin Routes ─────────────────────────────── */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/categories" component={AdminCategories} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/media" component={AdminMedia} />
      <Route path="/admin/registrations" component={AdminRegistrations} />
      <Route path="/admin/logs" component={AdminLogs} />
      <Route path="/admin/users" component={AdminUsers} />

      {/* ── 404 ──────────────────────────────────────── */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
