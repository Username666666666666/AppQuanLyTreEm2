import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Home, Search } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Rainbow gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-50 via-transparent to-green-50 opacity-70"></div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-40"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-2xl">
          {/* 404 illustration */}
          <div className="relative">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-24 h-24 text-purple-300 animate-pulse" />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Trang không tồn tại
            </h2>
            <p className="text-xl text-gray-600">
              Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
            </p>
            <p className="text-lg text-gray-500">
              Trang có thể đã bị xóa, di chuyển hoặc chưa bao giờ tồn tại.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
          </div>

          {/* Suggestions */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Có thể bạn đang tìm:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                variant="ghost" 
                className="text-purple-600 hover:bg-purple-50"
                onClick={() => navigate("/")}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="text-purple-600 hover:bg-purple-50"
                onClick={() => navigate("/upgrade")}
              >
                Nâng cấp
              </Button>
              <Button 
                variant="ghost" 
                className="text-purple-600 hover:bg-purple-50"
                onClick={() => navigate("/support")}
              >
                Hỗ trợ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
