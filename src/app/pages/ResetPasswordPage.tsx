import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";
import { toast } from "sonner";
import { Lock, Check, X } from "lucide-react";
import { supabase } from "../../supabaseClient";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const handleVerifyOTP = async () => {
  setLoading(true);
  const { error } = await supabase.auth.verifyOtp({
    email: email, // Email lấy từ location.state
    token: otp,   // Là chuỗi 6 số người dùng nhập
    type: 'recovery',
  });

  if (error) {
    toast.error("Mã không đúng hoặc đã hết hạn!");
  } else {
    setOtpVerified(true);
    toast.success("Xác thực thành công! Hãy nhập mật khẩu mới.");
  }
  setLoading(false);
};

 const handleResetPassword = async (e: React.FormEvent) => {
  e.preventDefault();

  // 🔥 chặn gọi 2 lần
  if (loading) return;

  if (!otpVerified) {
    toast.error("Vui lòng xác thực OTP trước!");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("Mật khẩu xác nhận không khớp!");
    return;
  }

  try {
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      toast.error("Lỗi đặt lại mật khẩu: " + error.message);
      return;
    }

    toast.success("Đặt lại mật khẩu thành công!");
    navigate("/login");

  } catch (err) {
    toast.error("Có lỗi xảy ra!");
  } finally {
    setLoading(false); // 🔥 luôn chạy, tránh kẹt loading
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
            <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Đặt lại mật khẩu
            </CardTitle>
            <CardDescription className="text-base">
              Nhập mã OTP và mật khẩu mới của bạn
            </CardDescription>
            {email && (
              <p className="text-sm text-gray-600">
                Mã đã được gửi đến: <span className="font-semibold">{email}</span>
              </p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* OTP Section */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Mã OTP (8 chữ số)</Label>
                  <div className="flex items-center gap-3">
                    <InputOTP
                      maxLength={8}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                      disabled={otpVerified}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                    </InputOTP>
                    <Button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={otp.length !== 8 || otpVerified}
                      variant={otpVerified ? "secondary" : "default"}
                      className={otpVerified ? "bg-green-100 hover:bg-green-100" : ""}
                    >
                      {otpVerified ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        "Kiểm tra"
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    💡 Ví dụ: Nhập mã <span className="font-mono font-semibold">12345678</span> 
                  </p>
                </div>

                {otpVerified && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <p className="text-sm text-green-800 font-medium">
                      Mã OTP đã được xác thực thành công!
                    </p>
                  </div>
                )}
              </div>

              {/* Password Section */}
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={!otpVerified}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={!otpVerified}
                    />
                  </div>
                  {confirmPassword && (
                    <div className="flex items-center gap-2 text-sm">
                      {newPassword === confirmPassword ? (
                        <>
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-green-600">Mật khẩu khớp</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 text-red-600" />
                          <span className="text-red-600">Mật khẩu không khớp</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Hướng dẫn:</strong>
                </p>
                <ol className="text-sm text-blue-800 list-decimal list-inside space-y-1 mt-2">
                  <li>Nhập mã OTP 8 chữ số từ email</li>
                  <li>Nhấn nút "Kiểm tra" để xác thực</li>
                  <li>Nhập mật khẩu mới (tối thiểu 8 ký tự)</li>
                  <li>Xác nhận lại mật khẩu</li>
                  <li>Nhấn "Đặt lại mật khẩu"</li>
                </ol>
              </div>

            <Button
  type="submit"
  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base h-11"
  disabled={!otpVerified || loading} // 🔥 chặn double click
>
  {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
