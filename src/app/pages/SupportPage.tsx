import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea } from "../components/ui/scroll-area";
import { getCurrentUser } from "../lib/auth";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Send, 
  MessageSquare, 
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Mail
} from "lucide-react";

type Message = {
  id: number;
  from: string;
  content: string;
  time: string;
  isStaff: boolean;
};

type Ticket = {
  id: number;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: string;
  messages: Message[];
};

export function SupportPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketMessage, setNewTicketMessage] = useState("");

  const isStaff = currentUser && (currentUser.role === "admin" || currentUser.role === "support");

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      userId: "user1",
      userName: "Nguyễn Văn A",
      userEmail: "nguyenvana@email.com",
      subject: "Không thể kết nối thiết bị iPad",
      status: "open",
      priority: "high",
      createdAt: "2024-03-27 09:30",
      messages: [
        { id: 1, from: "Nguyễn Văn A", content: "Em không thể kết nối iPad của con vào hệ thống. Đã thử nhiều lần nhưng vẫn báo lỗi.", time: "09:30", isStaff: false }
      ]
    },
    {
      id: 2,
      userId: "user2",
      userName: "Trần Thị B",
      userEmail: "tranthib@email.com",
      subject: "Hỏi về tính năng Premium",
      status: "in_progress",
      priority: "medium",
      createdAt: "2024-03-27 10:15",
      messages: [
        { id: 1, from: "Trần Thị B", content: "Cho em hỏi nếu nâng cấp lên Premium thì có những tính năng gì thêm?", time: "10:15", isStaff: false },
        { id: 2, from: "Nhân viên hỗ trợ", content: "Dạ chào chị! Gói Premium sẽ có thêm các tính năng: giám sát mạng xã hội, cảnh báo AI, giới hạn ứng dụng chi tiết, và hỗ trợ ưu tiên. Chị có muốn em tư vấn thêm không ạ?", time: "10:18", isStaff: true }
      ]
    },
    {
      id: 3,
      userId: "user3",
      userName: "Lê Văn C",
      userEmail: "levanc@email.com",
      subject: "Yêu cầu hoàn tiền",
      status: "resolved",
      priority: "high",
      createdAt: "2024-03-26 14:20",
      messages: [
        { id: 1, from: "Lê Văn C", content: "Tôi đã thanh toán nhầm 2 lần, xin hoàn lại một lần.", time: "14:20", isStaff: false },
        { id: 2, from: "Nhân viên hỗ trợ", content: "Dạ em xin lỗi anh vì sự bất tiện này. Em đã kiểm tra và chuyển cho bộ phận thu ngân xử lý hoàn tiền ạ.", time: "14:25", isStaff: true },
        { id: 3, from: "Lê Văn C", content: "Cảm ơn nhiều!", time: "15:30", isStaff: false },
        { id: 4, from: "Nhân viên hỗ trợ", content: "Dạ anh đã nhận được tiền hoàn chưa ạ? Chúng em đã xử lý xong rồi ạ.", time: "16:00", isStaff: true },
        { id: 5, from: "Lê Văn C", content: "Đã nhận rồi, cảm ơn team nhiều!", time: "16:05", isStaff: false }
      ]
    }
  ]);

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleSendReply = () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    const newMessage: Message = {
      id: selectedTicket.messages.length + 1,
      from: isStaff ? "Nhân viên hỗ trợ" : currentUser.name,
      content: replyMessage,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      isStaff: isStaff || false
    };

    setTickets(tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          messages: [...ticket.messages, newMessage],
          status: "in_progress" as const
        };
      }
      return ticket;
    }));

    setReplyMessage("");
    toast.success("Đã gửi tin nhắn!");
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTicket: Ticket = {
      id: tickets.length + 1,
      userId: currentUser.email,
      userName: currentUser.name,
      userEmail: currentUser.email,
      subject: newTicketSubject,
      status: "open",
      priority: "medium",
      createdAt: new Date().toLocaleString("vi-VN"),
      messages: [
        {
          id: 1,
          from: currentUser.name,
          content: newTicketMessage,
          time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          isStaff: false
        }
      ]
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketSubject("");
    setNewTicketMessage("");
    toast.success("Đã tạo yêu cầu hỗ trợ!");
  };

  const handleResolveTicket = (ticketId: number) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId) {
        toast.success("Đã đánh dấu hoàn thành!");
        return { ...ticket, status: "resolved" as const };
      }
      return ticket;
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-700"><Clock className="w-3 h-3 mr-1" />Mới</Badge>;
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-700"><AlertCircle className="w-3 h-3 mr-1" />Đang xử lý</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Hoàn thành</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Cao</Badge>;
      case "medium":
        return <Badge variant="secondary">Trung bình</Badge>;
      case "low":
        return <Badge variant="outline">Thấp</Badge>;
      default:
        return null;
    }
  };

  const userTickets = isStaff ? tickets : tickets.filter(t => t.userEmail === currentUser.email);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(isStaff ? "/admin" : "/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isStaff ? "Hỗ trợ khách hàng" : "Trung tâm hỗ trợ"}
              </h1>
              <p className="text-gray-600 text-sm">
                {isStaff ? "Quản lý yêu cầu hỗ trợ" : "Gửi yêu cầu và nhận hỗ trợ"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tickets list */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  Yêu cầu hỗ trợ
                </CardTitle>
                <CardDescription>
                  {userTickets.length} yêu cầu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {userTickets.map((ticket) => (
                      <Card 
                        key={ticket.id}
                        className={`cursor-pointer hover:shadow-md transition-shadow ${
                          selectedTicket?.id === ticket.id ? "border-purple-600 border-2" : ""
                        }`}
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              {getStatusBadge(ticket.status)}
                              {getPriorityBadge(ticket.priority)}
                            </div>
                            <h4 className="font-semibold text-gray-900 line-clamp-2">
                              {ticket.subject}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <User className="w-4 h-4" />
                              {ticket.userName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {ticket.createdAt}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {userTickets.length === 0 && (
                      <div className="text-center py-12">
                        <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-500">Chưa có yêu cầu nào</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat/Create ticket */}
          <div className="lg:col-span-2">
            <Tabs defaultValue={isStaff ? "chat" : "create"}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Trò chuyện</TabsTrigger>
                {!isStaff && <TabsTrigger value="create">Tạo yêu cầu mới</TabsTrigger>}
                {isStaff && <TabsTrigger value="info">Thông tin</TabsTrigger>}
              </TabsList>

              <TabsContent value="chat">
                {selectedTicket ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle>{selectedTicket.subject}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <User className="w-4 h-4" />
                            {selectedTicket.userName} • {selectedTicket.userEmail}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(selectedTicket.status)}
                          {isStaff && selectedTicket.status !== "resolved" && (
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleResolveTicket(selectedTicket.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Hoàn thành
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] mb-4">
                        <div className="space-y-4 pr-4">
                          {selectedTicket.messages.map((message) => (
                            <div 
                              key={message.id}
                              className={`flex ${message.isStaff ? "justify-start" : "justify-end"}`}
                            >
                              <div className={`max-w-[80%] rounded-lg p-4 ${
                                message.isStaff 
                                  ? "bg-gray-100 text-gray-900" 
                                  : "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              }`}>
                                <p className="font-semibold text-sm mb-1">{message.from}</p>
                                <p className="text-sm">{message.content}</p>
                                <p className={`text-xs mt-2 ${message.isStaff ? "text-gray-500" : "text-white/70"}`}>
                                  {message.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      {selectedTicket.status !== "resolved" && (
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Nhập tin nhắn..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className="flex-1"
                            rows={3}
                          />
                          <Button 
                            onClick={handleSendReply}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {selectedTicket.status === "resolved" && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                          <p className="text-green-800 font-semibold">Yêu cầu đã được hoàn thành</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Chọn yêu cầu để xem chi tiết
                      </h3>
                      <p className="text-gray-500">
                        Chọn một yêu cầu từ danh sách bên trái để xem và trả lời
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {!isStaff && (
                <TabsContent value="create">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tạo yêu cầu hỗ trợ mới</CardTitle>
                      <CardDescription>
                        Mô tả vấn đề của bạn, chúng tôi sẽ hỗ trợ ngay
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Tiêu đề</label>
                          <Input
                            placeholder="Ví dụ: Không thể kết nối thiết bị"
                            value={newTicketSubject}
                            onChange={(e) => setNewTicketSubject(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Mô tả chi tiết</label>
                          <Textarea
                            placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                            value={newTicketMessage}
                            onChange={(e) => setNewTicketMessage(e.target.value)}
                            rows={8}
                            required
                          />
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-800">
                            <strong>💡 Mẹo:</strong> Cung cấp thông tin chi tiết giúp chúng tôi hỗ trợ nhanh hơn:
                          </p>
                          <ul className="text-sm text-blue-700 list-disc list-inside mt-2 space-y-1">
                            <li>Thiết bị đang sử dụng (iPhone, iPad, Android...)</li>
                            <li>Các bước bạn đã thử</li>
                            <li>Thông báo lỗi (nếu có)</li>
                          </ul>
                        </div>

                        <Button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Gửi yêu cầu hỗ trợ
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {isStaff && (
                <TabsContent value="info">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hướng dẫn hỗ trợ</CardTitle>
                      <CardDescription>
                        Quy trình xử lý yêu cầu hỗ trợ khách hàng
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <img 
                        src="https://images.unsplash.com/photo-1766066014237-00645c74e9c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjBzZXJ2aWNlJTIwZGVza3xlbnwxfHx8fDE3NzQ1ODAzNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Customer support"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Quy trình xử lý:</h3>
                        <ol className="space-y-3">
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">1</span>
                            <p className="text-gray-700">Đọc kỹ yêu cầu và hiểu vấn đề của khách hàng</p>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">2</span>
                            <p className="text-gray-700">Trả lời nhanh chóng, lịch sự và chuyên nghiệp</p>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">3</span>
                            <p className="text-gray-700">Cung cấp hướng dẫn chi tiết, dễ hiểu</p>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">4</span>
                            <p className="text-gray-700">Xác nhận vấn đề đã được giải quyết</p>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">5</span>
                            <p className="text-gray-700">Đánh dấu "Hoàn thành" khi khách hàng hài lòng</p>
                          </li>
                        </ol>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          <strong>⚡ Lưu ý:</strong> Ưu tiên trả lời các yêu cầu có độ ưu tiên cao và yêu cầu từ khách hàng Premium
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
