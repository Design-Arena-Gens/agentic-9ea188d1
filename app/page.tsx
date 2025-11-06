"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "規劃3天2夜台北行程",
    "推薦京都必訪景點",
    "歐洲背包旅行預算建議",
    "東南亞海島度假推薦",
  ];

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: generateResponse(input),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("台北")) {
      return "🗺️ 台北3天2夜建議行程：\n\n第1天：\n• 上午：中正紀念堂、自由廣場\n• 下午：永康街美食巡禮\n• 晚上：台北101觀景台\n\n第2天：\n• 上午：故宮博物院\n• 下午：士林夜市\n• 晚上：淡水老街看夕陽\n\n第3天：\n• 上午：九份老街\n• 下午：象山步道健行\n• 晚上：西門町逛街購物";
    } else if (lowerQuery.includes("京都")) {
      return "🏯 京都必訪景點推薦：\n\n• 清水寺 - 經典建築與絕美景色\n• 伏見稻荷大社 - 千本鳥居\n• 金閣寺 - 金光閃閃的禪寺\n• 嵐山竹林 - 幽靜竹林小徑\n• 祇園 - 藝伎文化體驗\n• 錦市場 - 京都廚房美食巡禮\n\n建議停留：3-4天";
    } else if (lowerQuery.includes("預算") || lowerQuery.includes("歐洲")) {
      return "💰 歐洲背包旅行預算建議（每日）：\n\n住宿：€20-40（青年旅舍床位）\n餐飲：€15-25（自煮+超市）\n交通：€10-20（城市通票）\n景點：€10-15（博物館/景點）\n\n總計：€55-100/天\n\n省錢秘訣：\n✓ 使用Eurail Pass跨國移動\n✓ 選擇東歐國家（物價較低）\n✓ 自煮或超市採購\n✓ 善用免費步行導覽";
    } else if (lowerQuery.includes("海島") || lowerQuery.includes("東南亞")) {
      return "🏖️ 東南亞海島度假推薦：\n\n1. 泰國普吉島\n   • 適合：初次海島旅行\n   • 特色：完善設施、夜生活豐富\n\n2. 菲律賓長灘島\n   • 適合：水上活動愛好者\n   • 特色：白沙灘、跳島遊\n\n3. 印尼峇里島\n   • 適合：度假放鬆\n   • 特色：廟宇文化、SPA按摩\n\n4. 馬來西亞沙巴\n   • 適合：潛水愛好者\n   • 特色：海底世界、自然生態";
    } else {
      return "我是您的旅行AI助手！我可以幫您：\n\n✈️ 規劃行程路線\n🗺️ 推薦旅遊景點\n💰 預算規劃建議\n🏨 住宿交通資訊\n🍜 在地美食推薦\n\n請告訴我您想去哪裡旅行，或是有什麼旅遊問題，我很樂意協助您！";
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold text-center">✈️ 旅行AI助手</h1>
          <p className="text-center text-purple-100 mt-2">
            讓我幫您規劃完美的旅程
          </p>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <p className="text-xl mb-6">開始您的旅行規劃 🌍</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-gray-700 text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "bg-white text-gray-800 shadow"
                  }`}
                >
                  <p className="whitespace-pre-line text-sm leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl shadow">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="詢問任何旅行問題..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              發送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
