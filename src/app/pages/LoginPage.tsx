import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { login, register } from "../lib/auth";
import { toast } from "sonner";
import { Mail, Lock, User, Chrome } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(loginEmail, loginPassword);
    if (user) {
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } else {
      toast.error("Email hoặc mật khẩu không đúng!");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(registerEmail, registerPassword, registerName);
    toast.success("Đăng ký thành công!");
    navigate("/");
  };

  const handleGoogleLogin = () => {
    toast.info("Chức năng đăng nhập Google sẽ được tích hợp sau!");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Rainbow gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100 via-transparent to-green-100 opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-orange-100 via-transparent to-cyan-100 opacity-50"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tr from-blue-300 to-cyan-300 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full blur-2xl opacity-40"></div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Hero content */}
          <div className="text-center md:text-left space-y-6 px-4">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                KidsGuard
              </h1>
              <p className="text-2xl font-semibold text-gray-800">
                Bảo vệ con bạn trong thế giới số
              </p>
              <p className="text-lg text-gray-600">
                Giải pháp quản lý và bảo vệ trẻ em toàn diện, giúp phụ huynh yên tâm hơn
              </p>
            </div>

            {/* Hero images */}
            <div className="hidden md:grid grid-cols-2 gap-4 mt-8">
              <img
                src="https://images.unsplash.com/photo-1752652011925-a397442fbe0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhcmVudCUyMGNoaWxkJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzQ1Nzk3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Parent and child"
                className="w-full h-48 object-cover rounded-2xl shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1675526607070-f5cbd71dde92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBkYXVnaHRlciUyMHRhYmxldCUyMHNtaWxlfGVufDF8fHx8MTc3NDU3OTcyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mother and daughter"
                className="w-full h-48 object-cover rounded-2xl shadow-xl"
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-3xl mb-2">🛡️</div>
                <p className="text-sm font-semibold text-gray-700">An toàn</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-3xl mb-2">📱</div>
                <p className="text-sm font-semibold text-gray-700">Theo dõi</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                <p className="text-sm font-semibold text-gray-700">Gia đình</p>
              </div>
            </div>
          </div>

          {/* Right side - Login/Register form */}
          <Card className="w-full max-w-md mx-auto backdrop-blur-md bg-white/90 shadow-2xl border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Chào mừng trở lại
              </CardTitle>
              <CardDescription className="text-center text-base">
                Đăng nhập hoặc tạo tài khoản mới
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="text-base">Đăng nhập</TabsTrigger>
                  <TabsTrigger value="register" className="text-base">Đăng ký</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="email@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Mật khẩu</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button
                        type="button"
                        variant="link"
                        className="text-purple-600 hover:text-purple-700 p-0 h-auto"
                        onClick={() => navigate("/forgot-password")}
                      >
                        Quên mật khẩu?
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base h-11"
                    >
                      Đăng nhập
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Hoặc</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11 text-base"
                      onClick={handleGoogleLogin}
                    >
                      <Chrome className="mr-2 h-5 w-5" />
                      Đăng nhập với Google
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Họ và tên</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Nguyễn Văn A"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="email@example.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Mật khẩu</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-base h-11"
                    >
                      Đăng ký
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Hoặc</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11 text-base"
                      onClick={handleGoogleLogin}
                    >
                      <Chrome className="mr-2 h-5 w-5" />
                      Đăng ký với Google
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
