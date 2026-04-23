import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Building2, 
  Image as ImageIcon, 
  Users, 
  ActivitySquare,
  LogOut,
  Menu,
  UserCog,
  Tag
} from "lucide-react";
import { useGetAdminMe, useAdminLogout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { data: admin, isLoading, isError } = useGetAdminMe();
  
  const logoutMutation = useAdminLogout({
    mutation: {
      onSuccess: () => {
        setLocation("/admin/login");
      }
    }
  });

  useEffect(() => {
    if (!isLoading && (isError || !admin)) {
      setLocation("/admin/login");
    }
  }, [isLoading, isError, admin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !admin) {
    return null;
  }

  const isAdmin = admin?.role === "admin";

  const navItems = [
    { name: "Tổng quan", path: "/admin", icon: LayoutDashboard },
    { name: "Danh mục", path: "/admin/categories", icon: Tag },
    { name: "Sản phẩm", path: "/admin/products", icon: Building2 },
    { name: "Media", path: "/admin/media", icon: ImageIcon },
    { name: "Khách hàng", path: "/admin/registrations", icon: Users },
    ...(isAdmin ? [
      { name: "Tài khoản", path: "/admin/users", icon: UserCog },
      { name: "Nhật ký", path: "/admin/logs", icon: ActivitySquare },
    ] : []),
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-primary text-primary-foreground">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="ERO Riverside Logo"
            className="h-8 w-8 object-contain brightness-0 invert"
          />
          <span className="font-display font-bold text-xl uppercase tracking-widest text-white">
            ERO <span className="text-accent">CMS</span>
          </span>
        </Link>
      </div>
      <div className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.path || (item.path !== '/admin' && location.startsWith(item.path));
          return (
            <Link key={item.path} href={item.path}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                isActive ? "bg-accent text-primary font-medium" : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}>
                <item.icon className="w-5 h-5" />
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
            {admin.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{admin.username}</p>
            <p className="text-xs text-gray-400">{admin.role === "admin" ? "Administrator" : "Editor"}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 left-0 z-20">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="h-8 w-8" />
            <span className="font-display font-bold text-lg text-primary">ERO CMS</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 bg-primary border-none">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </header>

        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
