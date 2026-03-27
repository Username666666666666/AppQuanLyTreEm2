import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { CheckCircle, Crown, Home, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export function UpgradeSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Rainbow gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-50 via-transparent to-green-50 opacity-70"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-purple-300 to-pink-300 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-white/90 backdrop-blur-md shadow-2xl border-0">
          <CardContent className="pt-12 pb-12 px-8">
            <div className="text-center space-y-6">
              {/* Success icon */}
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-14 h-14 text-white" />
                </div>
              </div>

              {/* Success message */}
              <div className="space-y-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Nâng cấp thành công! 🎉
                </h1>
                <p className="text-xl text-gray-700">
                  Chúc mừng bạn đã trở thành thành viên Premium
                </p>
              </div>

              {/* Premium badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-lg">
                <Crown className="w-8 h-8" />
                <span className="text-2xl font-bold">Premium Member</span>
                <Sparkles className="w-6 h-6" />
              </div>

              {/* Thank you message */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 space-y-4 border-2 border-purple-100">
                <h2 className="text-2xl font-bold text-gray-900">
                  Cảm ơn bạn đã tin tưởng KidsGuard! 💙
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  B���n giờ đây có thể truy cập đầy đủ tất cả các tính năng cao cấp để bảo vệ con bạn một cách toàn diện nhất. Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho gia đình bạn.
                </p>
              </div>

              {/* Benefits unlocked */}
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1">Giám sát toàn diện</h3>
                      <p className="text-sm text-gray-600">Theo dõi mọi hoạt động của con bạn</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1">Cảnh báo AI thông minh</h3>
                      <p className="text-sm text-gray-600">Nhận thông báo ngay khi có nguy hiểm</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1">Giám sát mạng xã hội</h3>
                      <p className="text-sm text-gray-600">WhatsApp, Instagram, TikTok và nhiều hơn</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-green-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1">Hỗ trợ ưu tiên</h3>
                      <p className="text-sm text-gray-600">Care Plus luôn sẵn sàng giúp bạn</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-14 px-8 text-lg"
                  onClick={() => navigate("/")}
                >
                  <Home className="w-5 h-5 mr-2" />
                  Về trang chủ
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                  onClick={() => navigate("/children/1")}
                >
                  Khám phá tính năng mới
                </Button>
              </div>

              {/* Support info */}
              <div className="pt-6 border-t">
                <p className="text-sm text-gray-600">
                  Cần hỗ trợ? Liên hệ chúng tôi qua email:{" "}
                  <a href="mailto:support@kidsguard.com" className="text-purple-600 hover:underline font-semibold">
                    support@kidsguard.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
