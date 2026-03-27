import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { getCurrentUser } from "../lib/auth";
import { toast } from "sonner";
import { 
  Crown, 
  Check, 
  X, 
  ArrowLeft,
  Shield,
  Clock,
  MapPin,
  Bell,
  MessageSquare,
  Eye,
  Zap,
  Heart,
  Star
} from "lucide-react";

export function UpgradePage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

 useEffect(() => {
  if (!currentUser) {
    navigate("/login");
  }
}, [currentUser, navigate]);

if (!currentUser) {
  return null;
}

  const handleUpgrade = (plan: string, price: string) => {
    // Simulate payment process
    toast.success(`Đang xử lý thanh toán gói ${plan}...`);
    setTimeout(() => {
      navigate("/upgrade-success");
    }, 1500);
  };

  const features = [
    {
      category: "An toàn",
      icon: Shield,
      items: [
        { name: "Tìm kiếm an toàn", basic: true, complete: true },
        { name: "Lọc web", basic: true, complete: true },
        { name: "Chặn game & ứng dụng", basic: true, complete: true },
        { name: "Cảnh báo hoạt động web", basic: false, complete: true },
        { name: "Cảnh báo website bị chặn", basic: false, complete: true },
        { name: "Thông tin chi tiết ứng dụng", basic: false, complete: true },
      ]
    },
    {
      category: "Cân bằng",
      icon: Clock,
      items: [
        { name: "Giới hạn thời gian hàng ngày", basic: true, complete: true },
        { name: "Tạm dừng truy cập internet", basic: true, complete: true },
        { name: "Lịch chặn thiết bị", basic: true, complete: true },
        { name: "Tùy chỉnh quy tắc ứng dụng & web", basic: false, complete: true },
        { name: "Giới hạn thời gian game & ứng dụng", basic: false, complete: true },
      ]
    },
    {
      category: "Hiển thị",
      icon: Eye,
      items: [
        { name: "Báo cáo hoạt động 30 ngày", basic: true, complete: true },
        { name: "Nút khẩn cấp*", basic: true, complete: true },
        { name: "Cảnh báo tải ứng dụng", basic: false, complete: true },
        { name: "Giám sát YouTube", basic: false, complete: true },
        { name: "Giám sát cuộc gọi & tin nhắn*", basic: false, complete: true },
        { name: "Cảnh báo tìm kiếm AI", basic: false, complete: true },
        { name: "Cảnh báo tin nhắn AI", basic: false, complete: true },
        { name: "Giám sát mạng xã hội (WhatsApp, Instagram, TikTok, Snapchat, X)*", basic: false, complete: true },
      ]
    },
    {
      category: "Vị trí",
      icon: MapPin,
      items: [
        { name: "Giám sát vị trí", basic: true, complete: true },
        { name: "Cảnh báo địa điểm đã lưu", basic: false, complete: true },
      ]
    },
    {
      category: "Hỗ trợ",
      icon: MessageSquare,
      items: [
        { name: "Hỗ trợ email Premium", basic: true, complete: true },
        { name: "Care Plus *", basic: false, complete: true },
      ]
    },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Rainbow gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-50 via-transparent to-green-50 opacity-70"></div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </div>
        </div>

        {/* Hero section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Nâng cấp lên Premium
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Bảo vệ con bạn tốt hơn với các tính năng cao cấp và giám sát toàn diện
            </p>

            {/* Hero Image */}
            <div className="max-w-4xl mx-auto mt-8">
              <img 
                src="https://images.unsplash.com/photo-1659823300663-93084f1795d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3Vic2NyaXB0aW9uJTIwdXBncmFkZSUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzQ1ODAzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Premium features"
                className="rounded-3xl shadow-2xl w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Pricing toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <Button
                variant={selectedPlan === "monthly" ? "default" : "ghost"}
                onClick={() => setSelectedPlan("monthly")}
                className={selectedPlan === "monthly" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : ""}
              >
                Hàng tháng
              </Button>
              <Button
                variant={selectedPlan === "yearly" ? "default" : "ghost"}
                onClick={() => setSelectedPlan("yearly")}
                className={selectedPlan === "yearly" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : ""}
              >
                Hàng năm
                <Badge className="ml-2 bg-green-500 text-white">Tiết kiệm 40%</Badge>
              </Button>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Basic Plan */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 hover:shadow-xl transition-shadow">
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl">Gói Basic</CardTitle>
                <CardDescription className="text-base mt-2">
                  Bảo vệ cơ bản cho gia đình bạn
                </CardDescription>
                <div className="mt-6">
                  <div className="text-5xl font-bold text-gray-900">
                    {selectedPlan === "monthly" ? "199.000₫" : "1.430.000₫"}
                  </div>
                  <div className="text-gray-600 mt-2">
                    {selectedPlan === "monthly" ? "/ tháng" : "/ năm"}
                  </div>
                  {selectedPlan === "yearly" && (
                    <Badge variant="secondary" className="mt-2">
                      ~119.000₫/tháng
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full h-12 text-base border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                  variant="outline"
                  onClick={() => handleUpgrade("Basic", selectedPlan === "monthly" ? "199.000₫" : "1.430.000₫")}
                >
                  Chọn gói Basic
                </Button>
                
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Bảo vệ cơ bản trên web và ứng dụng</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Giới hạn thời gian sử dụng</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Giám sát vị trí cơ bản</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Báo cáo hoạt động 30 ngày</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Hỗ trợ email</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Complete Plan - Featured */}
            <Card className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 border-0 text-white hover:shadow-2xl transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-purple-900 px-6 py-2 font-bold text-sm rounded-bl-2xl flex items-center gap-1">
                <Star className="w-4 h-4" />
                Phổ biến nhất
              </div>
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Crown className="w-8 h-8 text-yellow-300" />
                </div>
                <CardTitle className="text-3xl text-white">Gói Complete</CardTitle>
                <CardDescription className="text-white/90 text-base mt-2">
                  Bảo vệ toàn diện với mọi tính năng cao cấp
                </CardDescription>
                <div className="mt-6">
                  <div className="text-5xl font-bold text-white">
                    {selectedPlan === "monthly" ? "399.000₫" : "2.870.000₫"}
                  </div>
                  <div className="text-white/90 mt-2">
                    {selectedPlan === "monthly" ? "/ tháng" : "/ năm"}
                  </div>
                  {selectedPlan === "yearly" && (
                    <Badge className="mt-2 bg-yellow-400 text-purple-900">
                      ~239.000₫/tháng - Tiết kiệm 1.900.000₫
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full h-12 text-base bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                  onClick={() => handleUpgrade("Complete", selectedPlan === "monthly" ? "399.000₫" : "2.870.000₫")}
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Chọn gói Complete
                </Button>
                
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">Tất cả tính năng của gói Basic</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white font-semibold">Giám sát mạng xã hội toàn diện</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white font-semibold">Cảnh báo AI thông minh</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white font-semibold">Giám sát YouTube & cuộc gọi</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white font-semibold">Tùy chỉnh quy tắc nâng cao</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white font-semibold">Hỗ trợ ưu tiên Care Plus</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed feature comparison table */}
          <Card className="bg-white/90 backdrop-blur-sm max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl text-center">So sánh chi tiết các gói</CardTitle>
              <CardDescription className="text-center text-base">
                Xem tất cả tính năng được bao gồm trong từng gói
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {features.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200">
                      <category.icon className="w-6 h-6 text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                    </div>
                    <div className="grid gap-2">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center py-3 px-4 hover:bg-purple-50 rounded-lg transition-colors">
                          <span className="text-gray-700">{item.name}</span>
                          <div className="w-24 flex justify-center">
                            {item.basic ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300" />
                            )}
                          </div>
                          <div className="w-24 flex justify-center">
                            {item.complete ? (
                              <Check className="w-5 h-5 text-purple-600" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center mt-8 pt-6 border-t-2">
                <span></span>
                <div className="w-24 text-center font-bold text-gray-700">BASIC</div>
                <div className="w-24 text-center font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">COMPLETE</div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm text-center">
              <CardContent className="pt-8 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">An toàn tuyệt đối</h4>
                <p className="text-gray-600">
                  Bảo vệ con bạn khỏi nội dung không phù hợp và các mối nguy hiểm trực tuyến
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm text-center">
              <CardContent className="pt-8 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Yên tâm hơn</h4>
                <p className="text-gray-600">
                  Luôn biết con bạn đang làm gì và ở đâu với giám sát thời gian thực
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm text-center">
              <CardContent className="pt-8 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">Dễ dàng sử dụng</h4>
                <p className="text-gray-600">
                  Giao diện thân thiện, dễ cài đặt và quản lý mọi lúc mọi nơi
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA section */}
          <div className="mt-16 text-center space-y-6 pb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Sẵn sàng bảo vệ con bạn?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hơn 100,000 phụ huynh đã tin tưởng KidsGuard để bảo vệ con em của họ
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-14 px-8 text-lg"
                onClick={() => handleUpgrade("Complete", selectedPlan === "monthly" ? "399.000₫" : "2.870.000₫")}
              >
                <Crown className="w-6 h-6 mr-2" />
                Nâng cấp ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
