import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { getCurrentUser, logout } from "../lib/auth";
import { toast } from "sonner";
import { 
  Plus, 
  Crown, 
  Sparkles, 
  Shield, 
  Clock, 
  MapPin, 
  Smartphone,
  Settings,
  LogOut,
  Users,
  MessageSquare,
  Lightbulb,
  Baby,
  ChevronRight,
  CheckCircle
} from "lucide-react";

export function DashboardPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [childDevice, setChildDevice] = useState("");
  const [children, setChildren] = useState([
    { id: 1, name: "Minh An", age: 8, device: "iPad", status: "connected", isPremium: false },
    { id: 2, name: "Phương Anh", age: 12, device: "iPhone", status: "connected", isPremium: true },
  ]);

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const isPremiumUser = currentUser.isPremium;

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    const newChild = {
      id: children.length + 1,
      name: childName,
      age: parseInt(childAge),
      device: childDevice,
      status: "pending",
      isPremium: isPremiumUser
    };
    setChildren([...children, newChild]);
    setIsAddChildOpen(false);
    setChildName("");
    setChildAge("");
    setChildDevice("");
    toast.success(`Đã thêm ${childName}! Vui lòng kết nối thiết bị.`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Đã đăng xuất!");
  };

  const parentingTips = [
    {
      icon: "🎯",
      title: "Đặt giới hạn thời gian",
      description: "Thiết lập giới hạn thời gian sử dụng thiết bị hợp lý cho từng độ tuổi"
    },
    {
      icon: "🗣️",
      title: "Giao tiếp cởi mở",
      description: "Thường xuyên nói chuyện với con về hoạt động trực tuyến của chúng"
    },
    {
      icon: "🔍",
      title: "Giám sát nội dung",
      description: "Kiểm tra định kỳ các ứng dụng và trang web con truy cập"
    },
    {
      icon: "👨‍👩‍👧",
      title: "Gương tốt cho con",
      description: "Hãy là tấm gương về việc sử dụng công nghệ có trách nhiệm"
    },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Rainbow gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-50 via-transparent to-green-50 opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-orange-50 via-transparent to-cyan-50 opacity-50"></div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-40"></div>

      {/* Header */}
      <div className="relative z-10">
        <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  KidsGuard
                </h1>
                <Badge variant="secondary" className="text-sm">
                  {currentUser.role === "admin" ? "👑 Admin" : currentUser.role === "cashier" ? "💰 Thu ngân" : currentUser.role === "support" ? "💬 Hỗ trợ" : currentUser.role === "account_manager" ? "👤 Quản lý TK" : "👤 Phụ huynh"}
                </Badge>
              </div>

              <div className="flex items-center gap-3">
                {/* Premium badge or upgrade button */}
                {isPremiumUser ? (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-sm">
                    <Crown className="w-4 h-4 mr-1" />
                    Premium
                  </Badge>
                ) : (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="px-3 py-1.5">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Trial
                    </Badge>
                    <Button 
                      onClick={() => navigate("/upgrade")}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Nâng cấp
                    </Button>
                  </div>
                )}

                {/* Admin/Staff navigation */}
                {currentUser.role === "admin" && (
                  <Button variant="outline" onClick={() => navigate("/admin")}>
                    <Settings className="w-4 h-4 mr-2" />
                    Quản trị
                  </Button>
                )}
                {currentUser.role === "support" && (
                  <Button variant="outline" onClick={() => navigate("/support")}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Hỗ trợ
                  </Button>
                )}

                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Welcome section with hero image */}
          <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 border-0 text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">
                    Xin chào, {currentUser.name}! 👋
                  </h2>
                  <p className="text-lg text-white/90">
                    Hãy cùng chúng tôi bảo vệ con bạn trong môi trường số an toàn và lành mạnh
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-gray-100"
                      onClick={() => setIsAddChildOpen(true)}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Thêm trẻ em
                    </Button>
                    {!isPremiumUser && (
                      <Button 
                        size="lg"
                        variant="outline"
                        className="bg-white/20 border-white text-white hover:bg-white/30"
                        onClick={() => navigate("/upgrade")}
                      >
                        <Crown className="w-5 h-5 mr-2" />
                        Xem gói Premium
                      </Button>
                    )}
                  </div>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1771169204750-3b1b20d98053?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkcmVuJTIwcGxheWluZyUyMHJhaW5ib3d8ZW58MXx8fHwxNzc0NTgwMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Happy children"
                    className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Children management section */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column - Children list */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Trẻ em đang quản lý</h3>
                <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm trẻ em
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Thêm trẻ em mới
                      </DialogTitle>
                      <DialogDescription>
                        Nhập thông tin của trẻ và thiết bị cần kết nối. Bạn sẽ nhận được hướng dẫn chi tiết sau khi hoàn tất.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddChild} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="child-name">Tên trẻ</Label>
                        <Input
                          id="child-name"
                          placeholder="Ví dụ: Minh An"
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="child-age">Tuổi</Label>
                        <Input
                          id="child-age"
                          type="number"
                          min="1"
                          max="18"
                          placeholder="Ví dụ: 8"
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="child-device">Thiết bị</Label>
                        <Select value={childDevice} onValueChange={setChildDevice} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại thiết bị" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="iPhone">iPhone</SelectItem>
                            <SelectItem value="iPad">iPad</SelectItem>
                            <SelectItem value="Android Phone">Android Phone</SelectItem>
                            <SelectItem value="Android Tablet">Android Tablet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                        <p className="text-sm font-semibold text-blue-900 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Hướng dẫn kết nối:
                        </p>
                        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                          <li>Tải ứng dụng KidsGuard trên thiết bị của trẻ</li>
                          <li>Đăng nhập bằng mã kết nối sẽ được cung cấp</li>
                          <li>Cấp quyền theo hướng dẫn trên màn hình</li>
                          <li>Hoàn tất và bắt đầu giám sát</li>
                        </ol>
                      </div>
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Thêm và kết nối
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {children.length === 0 ? (
                <Card className="bg-white/80 backdrop-blur-sm border-dashed border-2">
                  <CardContent className="p-12 text-center space-y-4">
                    <Baby className="w-16 h-16 mx-auto text-gray-400" />
                    <div>
                      <h4 className="text-xl font-semibold text-gray-700">Chưa có trẻ em nào</h4>
                      <p className="text-gray-500 mt-2">Hãy thêm trẻ em đầu tiên để bắt đầu bảo vệ chúng</p>
                    </div>
                    <Button 
                      onClick={() => setIsAddChildOpen(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm trẻ em đầu tiên
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {children.map((child) => (
                    <Card 
                      key={child.id} 
                      className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer group"
                      onClick={() => navigate(`/children/${child.id}`)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
                              {child.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xl font-semibold text-gray-800">{child.name}</h4>
                                {child.isPremium && (
                                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Premium
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <Baby className="w-4 h-4 mr-1" />
                                  {child.age} tuổi
                                </span>
                                <span className="flex items-center">
                                  <Smartphone className="w-4 h-4 mr-1" />
                                  {child.device}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {child.status === "connected" ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Đã kết nối
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="border-orange-200 text-orange-700">
                                <Clock className="w-3 h-3 mr-1" />
                                Đang chờ
                              </Badge>
                            )}
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                          </div>
                        </div>
                        
                        {child.status === "connected" && (
                          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t">
                            <div className="text-center">
                              <Shield className="w-5 h-5 mx-auto text-green-600 mb-1" />
                              <p className="text-xs text-gray-600">An toàn</p>
                            </div>
                            <div className="text-center">
                              <Clock className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                              <p className="text-xs text-gray-600">2h30p hôm nay</p>
                            </div>
                            <div className="text-center">
                              <MapPin className="w-5 h-5 mx-auto text-purple-600 mb-1" />
                              <p className="text-xs text-gray-600">Ở nhà</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Right column - Parenting tips & Features */}
            <div className="space-y-6">
              {/* Parenting Tips */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    Mẹo quản lý trẻ
                  </CardTitle>
                  <CardDescription>
                    Các lời khuyên hữu ích cho phụ huynh
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {parentingTips.map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                      <div className="flex gap-3">
                        <div className="text-2xl">{tip.icon}</div>
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-1">{tip.title}</h5>
                          <p className="text-sm text-gray-600">{tip.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Feature showcase */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">Bảo vệ toàn diện</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <img 
                    src="https://images.unsplash.com/photo-1766973117689-1f4fad3c42b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwYXJlbnRpbmclMjBraWRzJTIwc2FmZXR5fGVufDF8fHx8MTc3NDU4MDM2NHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Family safety"
                    className="rounded-lg w-full h-32 object-cover mb-3"
                  />
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Giám sát hoạt động web và ứng dụng</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Theo dõi vị trí thời gian thực</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Báo cáo chi tiết và cảnh báo</span>
                  </div>
                  {!isPremiumUser && (
                    <Button 
                      className="w-full mt-3 bg-white text-purple-600 hover:bg-gray-100"
                      onClick={() => navigate("/upgrade")}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Nâng cấp để mở khóa tất cả
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
