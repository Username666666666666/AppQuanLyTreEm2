import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { getCurrentUser } from "../../lib/auth";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Search, 
  UserPlus, 
  Edit, 
  Lock,
  Unlock,
  Shield,
  Crown,
  Mail
} from "lucide-react";

export function AdminUsersPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");

 useEffect(() => {
  if (!currentUser || currentUser.role !== "admin") {
    navigate("/");
  }
}, [currentUser, navigate]);

if (!currentUser || currentUser.role !== "admin") {
  return null;
}

  const [users, setUsers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@email.com", role: "user", status: "active", isPremium: true },
    { id: 2, name: "Trần Thị B", email: "tranthib@email.com", role: "user", status: "active", isPremium: false },
    { id: 3, name: "Lê Văn C", email: "levanc@email.com", role: "cashier", status: "active", isPremium: true },
    { id: 4, name: "Phạm Thị D", email: "phamthid@email.com", role: "support", status: "active", isPremium: true },
    { id: 5, name: "Hoàng Văn E", email: "hoangvane@email.com", role: "account_manager", status: "active", isPremium: true },
    { id: 6, name: "Võ Thị F", email: "vothif@email.com", role: "user", status: "locked", isPremium: false },
  ]);

  const getRoleBadge = (role: string) => {
    const roleConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      admin: { label: "👑 Admin", variant: "destructive" },
      cashier: { label: "💰 Thu ngân", variant: "default" },
      support: { label: "💬 Hỗ trợ", variant: "secondary" },
      account_manager: { label: "👤 Quản lý TK", variant: "outline" },
      user: { label: "👤 Người dùng", variant: "secondary" },
    };
    const config = roleConfig[role] || roleConfig.user;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleToggleLock = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === "active" ? "locked" : "active";
        toast.success(`Đã ${newStatus === "locked" ? "khóa" : "mở khóa"} tài khoản ${user.name}`);
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: "active" as const,
      isPremium: false
    };
    setUsers([...users, newUser]);
    setIsAddUserOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("user");
    toast.success(`Đã thêm người dùng ${newUserName}`);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/admin")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
                <p className="text-gray-600 text-sm">Tổng: {users.length} người dùng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Danh sách người dùng</CardTitle>
                <CardDescription>Quản lý tài khoản và phân quyền người dùng</CardDescription>
              </div>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Thêm người dùng
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Thêm người dùng mới</DialogTitle>
                    <DialogDescription>
                      Nhập thông tin người dùng và phân quyền phù hợp
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddUser} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-name">Họ và tên</Label>
                      <Input
                        id="user-name"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-email">Email</Label>
                      <Input
                        id="user-email"
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-role">Vai trò</Label>
                      <Select value={newUserRole} onValueChange={setNewUserRole}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">👤 Người dùng</SelectItem>
                          <SelectItem value="cashier">💰 Thu ngân</SelectItem>
                          <SelectItem value="support">💬 Hỗ trợ</SelectItem>
                          <SelectItem value="account_manager">👤 Quản lý tài khoản</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Thêm người dùng
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search bar */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Gói</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        {user.isPremium ? (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        ) : (
                          <Badge variant="outline">Trial</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.status === "active" ? (
                          <Badge className="bg-green-100 text-green-700">
                            <Unlock className="w-3 h-3 mr-1" />
                            Hoạt động
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <Lock className="w-3 h-3 mr-1" />
                            Đã khóa
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {user.role !== "admin" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toast.info("Chức năng chỉnh sửa đang được phát triển")}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant={user.status === "active" ? "destructive" : "secondary"}
                                size="sm"
                                onClick={() => handleToggleLock(user.id)}
                              >
                                {user.status === "active" ? (
                                  <Lock className="w-4 h-4" />
                                ) : (
                                  <Unlock className="w-4 h-4" />
                                )}
                              </Button>
                            </>
                          )}
                          {user.role === "admin" && (
                            <Badge variant="secondary" className="ml-2">
                              <Shield className="w-3 h-3 mr-1" />
                              Được bảo vệ
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Không tìm thấy người dùng nào</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Tổng người dùng</p>
                  <p className="text-3xl font-bold text-blue-900">{users.length}</p>
                </div>
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Tài khoản hoạt động</p>
                  <p className="text-3xl font-bold text-green-900">
                    {users.filter(u => u.status === "active").length}
                  </p>
                </div>
                <Unlock className="w-12 h-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700">Premium</p>
                  <p className="text-3xl font-bold text-orange-900">
                    {users.filter(u => u.isPremium).length}
                  </p>
                </div>
                <Crown className="w-12 h-12 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
