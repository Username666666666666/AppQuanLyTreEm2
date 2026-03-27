import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { getCurrentUser, logout } from "../../lib/auth";
import { 
  Users, 
  ShieldCheck, 
  MessageSquare, 
  DollarSign,
  TrendingUp,
  Activity,
  Crown,
  LogOut,
  Settings,
  BarChart
} from "lucide-react";
import { useEffect } from "react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

 useEffect(() => {
  if (!currentUser || currentUser.role !== "admin") {
    navigate("/");
  }
}, [currentUser, navigate]);

if (!currentUser || currentUser.role !== "admin") {
  return null;
}

  const stats = [
    { title: "Tổng người dùng", value: "1,234", icon: Users, color: "from-blue-500 to-cyan-500", change: "+12%" },
    { title: "Người dùng Premium", value: "456", icon: Crown, color: "from-yellow-500 to-orange-500", change: "+8%" },
    { title: "Doanh thu tháng", value: "125.8M₫", icon: DollarSign, color: "from-green-500 to-emerald-500", change: "+15%" },
    { title: "Yêu cầu hỗ trợ", value: "23", icon: MessageSquare, color: "from-purple-500 to-pink-500", change: "-5%" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Chào mừng, {currentUser.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Về trang chủ
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/admin/users")}>
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Quản lý người dùng</CardTitle>
                <CardDescription>
                  Xem, chỉnh sửa và quản lý tài khoản người dùng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Mở quản lý →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/admin/roles")}>
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Phân quyền</CardTitle>
                <CardDescription>
                  Cấu hình vai trò và quyền hạn cho nhân viên
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Mở phân quyền →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/support")}>
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Hỗ trợ khách hàng</CardTitle>
                <CardDescription>
                  Xem và trả lời yêu cầu hỗ trợ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Mở hỗ trợ →
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-4">
                  <BarChart className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Báo cáo & Thống kê</CardTitle>
                <CardDescription>
                  Xem báo cáo chi tiết về hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  Sắp ra mắt
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Cài đặt hệ thống</CardTitle>
                <CardDescription>
                  Cấu hình và tùy chỉnh hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  Sắp ra mắt
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center mb-4">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Hoạt động hệ thống</CardTitle>
                <CardDescription>
                  Theo dõi log và hoạt động
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  Sắp ra mắt
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Hero image */}
          <Card className="mt-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 border-0 text-white">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Quản lý hiệu quả</h2>
                  <p className="text-lg text-white/90 mb-6">
                    Dashboard quản trị viên cung cấp đầy đủ công cụ để quản lý người dùng, phân quyền và giám sát hệ thống một cách hiệu quả.
                  </p>
                  <ul className="space-y-2 text-white/90">
                    <li>✅ Quản lý người dùng toàn diện</li>
                    <li>✅ Phân quyền linh hoạt</li>
                    <li>✅ Hỗ trợ khách hàng nhanh chóng</li>
                    <li>✅ Báo cáo thống kê chi tiết</li>
                  </ul>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1731846584223-81977e156b2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG1pbiUyMGRhc2hib2FyZCUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzc0NTgwMzY1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Admin dashboard"
                    className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
