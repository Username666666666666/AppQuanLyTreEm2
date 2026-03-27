import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { getCurrentUser } from "../../lib/auth";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Shield, 
  Users, 
  DollarSign, 
  MessageSquare,
  Settings,
  Check,
  X
} from "lucide-react";

type Permission = {
  id: string;
  name: string;
  description: string;
};

type Role = {
  id: string;
  name: string;
  icon: any;
  color: string;
  permissions: Record<string, boolean>;
};

export function AdminRolesPage() {
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

  const permissions: Permission[] = [
    { id: "view_users", name: "Xem người dùng", description: "Xem danh sách và thông tin người dùng" },
    { id: "edit_users", name: "Chỉnh sửa người dùng", description: "Sửa thông tin tài khoản người dùng" },
    { id: "lock_users", name: "Khóa/Mở khóa người dùng", description: "Khóa hoặc mở khóa tài khoản" },
    { id: "delete_users", name: "Xóa người dùng", description: "Xóa vĩnh viễn tài khoản (chỉ user thường)" },
    { id: "manage_roles", name: "Quản lý phân quyền", description: "Thay đổi vai trò và quyền hạn" },
    { id: "view_payments", name: "Xem thanh toán", description: "Xem lịch sử và thống kê thanh toán" },
    { id: "process_payments", name: "Xử lý thanh toán", description: "Xác nhận và xử lý giao dịch" },
    { id: "refund_payments", name: "Hoàn tiền", description: "Thực hiện hoàn tiền cho khách hàng" },
    { id: "view_support", name: "Xem yêu cầu hỗ trợ", description: "Xem tin nhắn và yêu cầu hỗ trợ" },
    { id: "respond_support", name: "Trả lời hỗ trợ", description: "Phản hồi yêu cầu hỗ trợ khách hàng" },
    { id: "system_settings", name: "Cài đặt hệ thống", description: "Cấu hình và tùy chỉnh hệ thống" },
    { id: "view_reports", name: "Xem báo cáo", description: "Xem báo cáo và thống kê hệ thống" },
  ];

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "👑 Admin",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      permissions: Object.fromEntries(permissions.map(p => [p.id, true]))
    },
    {
      id: "cashier",
      name: "💰 Thu ngân",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      permissions: {
        view_users: true,
        view_payments: true,
        process_payments: true,
        refund_payments: true,
        view_reports: true,
      }
    },
    {
      id: "support",
      name: "💬 Hỗ trợ",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
      permissions: {
        view_users: true,
        view_support: true,
        respond_support: true,
      }
    },
    {
      id: "account_manager",
      name: "👤 Quản lý tài khoản",
      icon: Users,
      color: "from-purple-500 to-indigo-500",
      permissions: {
        view_users: true,
        edit_users: true,
        lock_users: true,
        view_support: true,
      }
    },
  ]);

  const handleTogglePermission = (roleId: string, permissionId: string) => {
    if (roleId === "admin") {
      toast.error("Không thể thay đổi quyền của Admin!");
      return;
    }

    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const newPermissions = { ...role.permissions };
        newPermissions[permissionId] = !newPermissions[permissionId];
        toast.success(`Đã cập nhật quyền cho ${role.name}`);
        return { ...role, permissions: newPermissions };
      }
      return role;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Phân quyền</h1>
              <p className="text-gray-600 text-sm">Cấu hình vai trò và quyền hạn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info banner */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hướng dẫn phân quyền</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✅ Chỉ Admin mới có thể thay đổi phân quyền</li>
                  <li>✅ Không thể chỉnh sửa quyền của Admin và các nhân viên khác</li>
                  <li>✅ Thu ngân: Quản lý thanh toán và giao dịch</li>
                  <li>✅ Hỗ trợ: Trả lời yêu cầu và hỗ trợ khách hàng</li>
                  <li>✅ Quản lý tài khoản: Thêm, sửa, khóa tài khoản người dùng (không xóa)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {roles.map((role) => (
            <Card key={role.id} className="bg-white shadow-lg">
              <CardHeader className={`bg-gradient-to-r ${role.color} text-white rounded-t-lg`}>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <role.icon className="w-6 h-6" />
                  </div>
                  {role.name}
                </CardTitle>
                <CardDescription className="text-white/90">
                  {role.id === "admin" && "Toàn quyền quản trị hệ thống"}
                  {role.id === "cashier" && "Quản lý thanh toán và giao dịch"}
                  {role.id === "support" && "Hỗ trợ khách hàng"}
                  {role.id === "account_manager" && "Quản lý tài khoản người dùng"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {permissions.map((permission) => {
                    const hasPermission = role.permissions[permission.id] || false;
                    const isAdmin = role.id === "admin";
                    
                    return (
                      <div 
                        key={permission.id} 
                        className={`flex items-start justify-between p-4 rounded-lg border ${
                          hasPermission ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Label className="font-semibold text-gray-900">{permission.name}</Label>
                            {hasPermission && <Check className="w-4 h-4 text-green-600" />}
                            {!hasPermission && <X className="w-4 h-4 text-gray-400" />}
                          </div>
                          <p className="text-sm text-gray-600">{permission.description}</p>
                        </div>
                        <Switch
                          checked={hasPermission}
                          onCheckedChange={() => handleTogglePermission(role.id, permission.id)}
                          disabled={isAdmin}
                          className="flex-shrink-0"
                        />
                      </div>
                    );
                  })}
                </div>

                {role.id === "admin" && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <strong>Vai trò Admin được bảo vệ:</strong> Không thể chỉnh sửa quyền hạn
                    </p>
                  </div>
                )}

                {role.id === "account_manager" && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Lưu ý:</strong> Quản lý tài khoản không được phép xóa tài khoản hoặc sửa đổi Admin và nhân viên khác
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-8 bg-white">
          <CardHeader>
            <CardTitle>Tóm tắt phân quyền</CardTitle>
            <CardDescription>So sánh nhanh quyền hạn của các vai trò</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Quyền hạn</th>
                    {roles.map(role => (
                      <th key={role.id} className="text-center py-3 px-4">{role.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((permission) => (
                    <tr key={permission.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-700">{permission.name}</td>
                      {roles.map(role => (
                        <td key={role.id} className="text-center py-3 px-4">
                          {role.permissions[permission.id] ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
