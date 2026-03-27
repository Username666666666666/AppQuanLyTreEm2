import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { getCurrentUser } from "../lib/auth";
import { useEffect } from "react";

import { 
  ArrowLeft, 
  Crown, 
  Shield, 
  Clock, 
  MapPin, 
  Smartphone,
  Globe,
  Youtube,
  MessageSquare,
  Phone,
  Lock,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";

export function ChildDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = getCurrentUser();

 useEffect(() => {
  if (!currentUser) {
    navigate("/login");
  }
}, [currentUser, navigate]);

if (!currentUser) {
  return null; // tránh render khi chưa redirect xong
}

  const isPremium = currentUser.isPremium;

  // Mock child data
  const child = {
    id: id,
    name: id === "1" ? "Minh An" : "Phương Anh",
    age: id === "1" ? 8 : 12,
    device: id === "1" ? "iPad" : "iPhone",
    isPremium: id === "2",
    avatar: id === "1" ? "M" : "P"
  };

  const todayUsage = {
    screenTime: 150, // minutes
    apps: [
      { name: "YouTube", time: 45, icon: "📺", safe: true },
      { name: "TikTok", time: 30, icon: "🎵", safe: isPremium },
      { name: "Safari", time: 40, icon: "🌐", safe: true },
      { name: "Games", time: 35, icon: "🎮", safe: true },
    ]
  };

  const location = {
    current: "Ở nhà",
    address: "123 Nguyễn Trãi, Q.1, TP.HCM",
    lastUpdate: "5 phút trước"
  };

  const safetyAlerts = [
    { type: "safe", message: "Không có cảnh báo nào trong 7 ngày qua", icon: CheckCircle, color: "text-green-600" },
  ];

  const premiumFeatures = [
    { name: "Giám sát YouTube", description: "Xem video con bạn đang xem", locked: !isPremium },
    { name: "Giám sát mạng xã hội", description: "Instagram, TikTok, Snapchat", locked: !isPremium },
    { name: "Cảnh báo AI", description: "Phát hiện nội dung nguy hiểm tự động", locked: !isPremium },
    { name: "Giới hạn ứng dụng", description: "Tùy chỉnh thời gian từng ứng dụng", locked: !isPremium },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Rainbow gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-50/50 via-transparent to-green-50/50"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigate("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
              {!isPremium && (
                <Button 
                  onClick={() => navigate("/upgrade")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Nâng cấp để mở khóa tất cả
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Child profile header */}
          <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 border-0 text-white mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30">
                  {child.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold">{child.name}</h1>
                    {child.isPremium && (
                      <Badge className="bg-yellow-400 text-purple-900">
                        <Crown className="w-4 h-4 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-lg text-white/90">
                    <span>{child.age} tuổi</span>
                    <span className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      {child.device}
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Đã kết nối
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety status banner */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-700">Trạng thái</p>
                  <p className="text-lg font-bold text-green-900">An toàn</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-700">Hôm nay</p>
                  <p className="text-lg font-bold text-blue-900">{Math.floor(todayUsage.screenTime / 60)}h {todayUsage.screenTime % 60}p</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-purple-700">Vị trí</p>
                  <p className="text-lg font-bold text-purple-900">{location.current}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed information tabs */}
          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="activity">Hoạt động</TabsTrigger>
              <TabsTrigger value="location">Vị trí</TabsTrigger>
              <TabsTrigger value="safety">An toàn</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Thời gian sử dụng hôm nay
                    </CardTitle>
                    <CardDescription>
                      Tổng: {Math.floor(todayUsage.screenTime / 60)}h {todayUsage.screenTime % 60}p / Giới hạn: 4h
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Progress value={(todayUsage.screenTime / 240) * 100} className="h-3" />
                        <p className="text-sm text-gray-600 mt-2">
                          Còn lại: {240 - todayUsage.screenTime} phút
                        </p>
                      </div>
                      
                      <div className="space-y-3 pt-4">
                        {todayUsage.apps.map((app, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{app.icon}</span>
                              <div>
                                <p className="font-semibold text-gray-900">{app.name}</p>
                                <p className="text-sm text-gray-600">{app.time} phút</p>
                              </div>
                            </div>
                            {app.safe ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">An toàn</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-500 flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                Premium
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      Xu hướng 7 ngày
                    </CardTitle>
                    <CardDescription>
                      So sánh thời gian sử dụng
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => (
                        <div key={day} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">{day}</span>
                            <span className="font-semibold text-gray-900">
                              {Math.floor((120 + Math.random() * 60) / 60)}h {Math.floor((120 + Math.random() * 60) % 60)}p
                            </span>
                          </div>
                          <Progress value={40 + Math.random() * 40} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {!isPremium && (
                <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Crown className="w-12 h-12 text-purple-600" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Xem chi tiết hơn với Premium</h3>
                        <p className="text-gray-700">Giám sát từng ứng dụng, website và nhận cảnh báo thời gian thực</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => navigate("/upgrade")}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Nâng cấp ngay
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    Vị trí hiện tại
                  </CardTitle>
                  <CardDescription>
                    Cập nhật: {location.lastUpdate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 mx-auto text-purple-600 mb-3" />
                        <p className="text-lg font-semibold text-gray-900">{location.current}</p>
                        <p className="text-gray-600">{location.address}</p>
                      </div>
                    </div>

                    {isPremium && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">Địa điểm an toàn</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-green-800">🏠 Nhà</span>
                            <Badge className="bg-green-100 text-green-700">Đang ở đây</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-green-800">🏫 Trường học</span>
                            <Badge variant="outline">Không hoạt động</Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isPremium && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3">
                        <Lock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-purple-900 mb-1">Nâng cấp để mở khóa</h4>
                          <p className="text-sm text-purple-700">Thiết lập địa điểm an toàn và nhận cảnh báo khi con rời khỏi khu vực</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Safety Tab */}
            <TabsContent value="safety" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    Trạng thái an toàn
                  </CardTitle>
                  <CardDescription>
                    Cảnh báo và hoạt động đáng chú ý
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {safetyAlerts.map((alert, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <alert.icon className={`w-6 h-6 ${alert.color} flex-shrink-0 mt-0.5`} />
                        <p className="text-gray-800">{alert.message}</p>
                      </div>
                    ))}

                    <div className="grid md:grid-cols-2 gap-4 pt-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <Globe className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                        <p className="font-semibold text-blue-900">Lọc web</p>
                        <p className="text-sm text-blue-700 mt-1">Đang hoạt động</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <Lock className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                        <p className="font-semibold text-purple-900">Chặn ứng dụng</p>
                        <p className="text-sm text-purple-700 mt-1">5 ứng dụng bị chặn</p>
                      </div>
                    </div>

                    {!isPremium && (
                      <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-lg">
                        <div className="flex items-start gap-4">
                          <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">Nâng cấp để bảo vệ tốt hơn</h4>
                            <ul className="space-y-1 text-sm text-gray-700">
                              <li>✅ Cảnh báo nội dung không phù hợp</li>
                              <li>✅ Giám sát tin nhắn và cuộc gọi</li>
                              <li>✅ Cảnh báo AI thông minh</li>
                              <li>✅ Giám sát mạng xã hội toàn diện</li>
                            </ul>
                            <Button 
                              onClick={() => navigate("/upgrade")}
                              className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            >
                              <Crown className="w-4 h-4 mr-2" />
                              Nâng cấp Premium
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Premium Features Tab */}
            <TabsContent value="premium" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {premiumFeatures.map((feature, index) => (
                  <Card key={index} className={feature.locked ? "bg-gray-50 border-gray-200" : "bg-white/80 backdrop-blur-sm border-green-200"}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className={feature.locked ? "text-gray-500" : "text-gray-900"}>{feature.name}</span>
                        {feature.locked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </CardTitle>
                      <CardDescription className={feature.locked ? "text-gray-400" : ""}>
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    {feature.locked && (
                      <CardContent>
                        <Button 
                          variant="outline"
                          className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                          onClick={() => navigate("/upgrade")}
                        >
                          <Crown className="w-4 h-4 mr-2" />
                          Mở khóa với Premium
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              {!isPremium && (
                <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 border-0 text-white">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Crown className="w-10 h-10 text-yellow-300" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-3">Nâng cấp lên Premium</h2>
                      <p className="text-lg text-white/90">
                        Mở khóa tất cả tính năng cao cấp và bảo vệ con bạn toàn diện hơn
                      </p>
                    </div>
                    <img 
                      src="https://images.unsplash.com/photo-1758612897668-ce0c153745e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHVzaW5nJTIwdGFibGV0JTIwZGV2aWNlfGVufDF8fHx8MTc3NDU4MDM2NXww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Child with device"
                      className="rounded-2xl shadow-2xl w-full max-w-md mx-auto h-48 object-cover"
                    />
                    <Button 
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-gray-100 h-14 px-8 text-lg"
                      onClick={() => navigate("/upgrade")}
                    >
                      <Crown className="w-5 h-5 mr-2" />
                      Xem gói Premium
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
