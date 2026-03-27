import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { Mail, ArrowLeft } from "lucide-react";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock email validation
    if (email) {
      toast.success("Email đã được gửi! Vui lòng kiểm tra hộp thư.");
      // Navigate to reset password page with OTP
      navigate("/reset-password", { state: { email } });
    } else {
      toast.error("Vui lòng nhập email!");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Rainbow gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100 via-transparent to-green-100 opacity-70"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md backdrop-blur-md bg-white/90 shadow-2xl border-0">
          <CardHeader className="space-y-1">
            <Button
              variant="ghost"
              className="w-fit -ml-2 mb-2"
              onClick={() => navigate("/login")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
            <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Quên mật khẩu
            </CardTitle>
            <CardDescription className="text-base">
              Nhập email của bạn để nhận mã OTP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 Mã OTP sẽ được gửi đến email của bạn. Vui lòng kiểm tra cả hộp thư spam nếu không thấy email.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base h-11"
              >
                Gửi mã OTP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
