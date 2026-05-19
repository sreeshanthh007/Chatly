import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  FileText,
  Image as ImageIcon,
  CheckCheck,
  PanelRightClose,
  PanelRightOpen,
  VolumeX,
  Volume2,
  Ban,
  Download,
  MessageCircle,
  X,
  Sparkles
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar } from "../../components/ui/avatar";

// Interface Definitions
interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  fallback: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  role: string;
  bio: string;
  email: string;
  sharedFiles: { name: string; size: string; type: string }[];
  sharedMedia: string[];
}

export default function DashboardPage() {
  // Mock conversations database
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Sarah Vance",
      avatar: "",
      fallback: "SV",
      lastMessage: "Let's review the asset guidelines tomorrow morning.",
      timestamp: "12:44 PM",
      unreadCount: 2,
      isOnline: true,
      role: "Lead UI Designer",
      bio: "Crafting beautiful warm design systems. Coffee enthusiast ☕",
      email: "sarah.vance@chatly.io",
      sharedFiles: [
        { name: "Brand_Identity_v2.pdf", size: "4.8 MB", type: "pdf" },
        { name: "Chatly_UI_Assets.fig", size: "28.1 MB", type: "figma" },
        { name: "Q3_Typography_Plan.docx", size: "1.2 MB", type: "word" }
      ],
      sharedMedia: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?w=200&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: "2",
      name: "Marcus Thorne",
      avatar: "",
      fallback: "MT",
      lastMessage: "Server integration is fully complete. Checks out.",
      timestamp: "11:30 AM",
      unreadCount: 0,
      isOnline: true,
      role: "Principal Backend Engineer",
      bio: "Locks, threads, and databases. Optimized for low latency. ⚡",
      email: "marcus.t@chatly.io",
      sharedFiles: [
        { name: "API_Spec_v3.json", size: "244 KB", type: "json" },
        { name: "Server_Deployment_Log.txt", size: "42 KB", type: "txt" }
      ],
      sharedMedia: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=200&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: "3",
      name: "Elena Rostova",
      avatar: "",
      fallback: "ER",
      lastMessage: "I forwarded the financial report to the stakeholders.",
      timestamp: "Yesterday",
      unreadCount: 0,
      isOnline: false,
      role: "VP of Product Strategy",
      bio: "Aligning user needs with premium business solutions.",
      email: "elena.r@chatly.io",
      sharedFiles: [
        { name: "Q1_Financials_Final.xlsx", size: "12.4 MB", type: "excel" },
        { name: "Staging_Pitch_v4.pdf", size: "8.1 MB", type: "pdf" }
      ],
      sharedMedia: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=200&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: "4",
      name: "Devon Lane",
      avatar: "",
      fallback: "DL",
      lastMessage: "Looks incredibly premium! The amber accents feel warm.",
      timestamp: "May 15",
      unreadCount: 0,
      isOnline: false,
      role: "Product Marketing Manager",
      bio: "Bringing visual identities to life in the premium tech sphere.",
      email: "devon.lane@chatly.io",
      sharedFiles: [
        { name: "Marketing_Campaign_Brief.pdf", size: "3.2 MB", type: "pdf" }
      ],
      sharedMedia: []
    }
  ]);

  // Mock message histories
  const [messagesByChatId, setMessagesByChatId] = useState<Record<string, Message[]>>({
    "1": [
      { id: "101", sender: "them", text: "Hey! Did you check out the new dark palette presets?", timestamp: "12:30 PM" },
      { id: "102", sender: "me", text: "Yes, I loaded #100D08 for the background. It feels extremely luxurious.", timestamp: "12:35 PM" },
      { id: "103", sender: "them", text: "Excellent choice! It contrasts perfectly with the Amber Gold accents.", timestamp: "12:37 PM" },
      { id: "104", sender: "them", text: "Let's review the asset guidelines tomorrow morning.", timestamp: "12:44 PM" }
    ],
    "2": [
      { id: "201", sender: "them", text: "Hey, the API endpoint for unread badge syncing is ready.", timestamp: "11:20 AM" },
      { id: "202", sender: "me", text: "Amazing work, testing it locally. Response times are extremely quick.", timestamp: "11:24 AM" },
      { id: "203", sender: "them", text: "Server integration is fully complete. Checks out.", timestamp: "11:30 AM" }
    ],
    "3": [
      { id: "301", sender: "me", text: "Elena, did you receive the revised financial forecasts?", timestamp: "Yesterday" },
      { id: "302", sender: "them", text: "I forwarded the financial report to the stakeholders.", timestamp: "Yesterday" }
    ],
    "4": [
      { id: "401", sender: "them", text: "Check out the latest screenshots of the Chatly client dashboard.", timestamp: "May 15" },
      { id: "402", sender: "me", text: "Wow, the contrast is spot on. Let me know your thoughts.", timestamp: "May 15" },
      { id: "403", sender: "them", text: "Looks incredibly premium! The amber accents feel warm.", timestamp: "May 15" }
    ]
  });

  // State managers
  const [activeChatId, setActiveChatId] = useState<string>("1");
  const [inputText, setInputText] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "online">("all");
  const [rightPanelOpen, setRightPanelOpen] = useState<boolean>(true);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  
  // Modals / Dropdowns
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState<boolean>(false);

  // References
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const activeConversation = conversations.find((c) => c.id === activeChatId) || conversations[0];
  const activeMessages = messagesByChatId[activeChatId] || [];

  // Scroll to bottom helper
  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChatId, activeMessages, isTyping]);

  // Clear unread count on selection
  useEffect(() => {
    if (activeConversation.unreadCount > 0) {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeChatId ? { ...c, unreadCount: 0 } : c))
      );
    }
  }, [activeChatId]);

  // Search and Filter Conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "unread") return matchesSearch && c.unreadCount > 0;
    if (activeTab === "online") return matchesSearch && c.isOnline;
    return matchesSearch;
  });

  // Handle Send Message
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    // Append message
    setMessagesByChatId((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }));

    // Update conversation last message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, lastMessage: inputText.trim(), timestamp: "Just now" }
          : c
      )
    );


    setInputText("");
    setShowEmojiPicker(false);

    // Mock Typing Simulator Response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // Select appropriate responses based on contact name
      const responses: Record<string, string[]> = {
        "Sarah Vance": [
          "That aligns perfectly with the visual direction.",
          "I will export the warm dark theme mockups for you by 5 PM.",
          "Let's finalize these layouts over a quick call tomorrow.",
          "Great! The amber gold border matches the premium aesthetic."
        ],
        "Marcus Thorne": [
          "Got it. I'll monitor the socket connections.",
          "I'm optimizing the database queries now.",
          "Checked the server logs, zero packet loss detected."
        ],
        "Elena Rostova": [
          "Perfect. Let's schedule the stakeholder presentation.",
          "I agree with the roadmap adjustments.",
          "Let me review the details and get back to you shortly."
        ],
        "Devon Lane": [
          "Perfect! Let's align on the social graphics next.",
          "The brand feeling is exactly what we wanted."
        ]
      };

      const defaultResp = ["Perfect! Let's continue working on this.", "Sounds good to me.", "Let's catch up later on this."];
      const activeRespList = responses[activeConversation.name] || defaultResp;
      const randomResponse = activeRespList[Math.floor(Math.random() * activeRespList.length)];

      const systemReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "them",
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessagesByChatId((prev) => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), systemReply]
      }));

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? { ...c, lastMessage: randomResponse, timestamp: "Just now" }
            : c
        )
      );
    }, 2000);
  };

  const handleEmojiClick = (emoji: string) => {
    setInputText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleSimulateAttachment = (fileName: string, fileSize: string) => {
    setShowAttachmentModal(false);
    
    // Simulate attaching file
    const attachmentMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: `📎 Attached: ${fileName} (${fileSize})`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessagesByChatId((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), attachmentMessage]
    }));

    // Update conversation last message
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? { ...c, lastMessage: `📎 Attached: ${fileName}`, timestamp: "Just now" }
          : c
      )
    );
  };

  return (
    <div className="h-screen w-screen flex bg-background text-text-primary overflow-hidden font-sans relative">
      
      {/* 1. LEFT SIDEBAR PANEL */}
      <aside className="w-[280px] bg-surface border-r border-border flex flex-col h-full flex-shrink-0 animate-fade-in">
        {/* Logo and User info header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-[8px] bg-accent/10 border border-accent/20 flex items-center justify-center">
              <MessageCircle className="h-4.5 w-4.5 text-accent" />
            </div>
            <span className="font-semibold text-accent tracking-wider uppercase text-sm">
              Chatly
            </span>
          </div>
          <div className="relative group cursor-pointer">
            <Avatar fallback="ME" size="sm" isOnline={true} />
            <div className="absolute right-0 top-10 bg-elevated border border-border rounded-[8px] p-2 text-xs w-[140px] shadow-xl hidden group-hover:block z-50">
              <div className="font-medium text-text-primary">Admin User</div>
              <div className="text-text-secondary text-[10px]">admin@chatly.io</div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-text-secondary/50" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-background/50 border-border text-text-primary placeholder:text-text-secondary/40 text-xs h-9"
            />
          </div>
        </div>

        {/* Filters Tabs */}
        <div className="px-3 pb-2 flex gap-1 border-b border-border/40">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-1 text-[11px] font-medium rounded-[4px] transition-all ${
              activeTab === "all"
                ? "bg-elevated text-accent border border-border"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`flex-1 py-1 text-[11px] font-medium rounded-[4px] transition-all relative ${
              activeTab === "unread"
                ? "bg-elevated text-accent border border-border"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Unread
            {conversations.some(c => c.unreadCount > 0) && (
              <span className="absolute top-1.5 right-2 h-1.5 w-1.5 bg-accent rounded-full animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("online")}
            className={`flex-1 py-1 text-[11px] font-medium rounded-[4px] transition-all ${
              activeTab === "online"
                ? "bg-elevated text-accent border border-border"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Online
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto space-y-0.5 p-2 scrollbar-thin">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((chat) => {
              const isActive = chat.id === activeChatId;
              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-[8px] cursor-pointer transition-all ${
                    isActive
                      ? "bg-elevated border-l-2 border-accent"
                      : "hover:bg-elevated/40 border-l-2 border-transparent"
                  }`}
                >
                  <Avatar
                    fallback={chat.fallback}
                    isOnline={chat.isOnline}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-xs font-medium truncate ${
                        isActive ? "text-accent" : "text-text-primary"
                      }`}>
                        {chat.name}
                      </span>
                      <span className="text-[10px] text-text-secondary/60 font-normal">
                        {chat.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-secondary truncate pr-2">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <span className="h-4.5 min-w-[18px] px-1 flex items-center justify-center rounded-full bg-accent text-[10px] text-background font-bold">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-text-secondary/50">
              No conversations found
            </div>
          )}
        </div>
      </aside>

      {/* 2. CENTER CHAT AREA */}
      <main className="flex-1 bg-background flex flex-col h-full overflow-hidden relative">
        {/* Chat header */}
        <header className="h-[60px] bg-surface/50 backdrop-blur-md border-b border-border/80 px-4 flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <Avatar
              fallback={activeConversation.fallback}
              isOnline={activeConversation.isOnline}
              size="md"
            />
            <div>
              <h2 className="text-xs font-semibold text-text-primary leading-tight">
                {activeConversation.name}
              </h2>
              <p className="text-[10px] text-text-secondary/80 flex items-center gap-1.5">
                {activeConversation.isOnline ? (
                  <>
                    <span className="h-1.5 w-1.5 bg-online rounded-full" />
                    <span>Active now</span>
                  </>
                ) : (
                  <span>Offline</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="text-text-secondary hover:text-text-primary h-9 w-9 rounded-[8px]"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-text-secondary hover:text-text-primary h-9 w-9 rounded-[8px]"
            >
              <Video className="h-4 w-4" />
            </Button>
            <div className="w-[1px] h-4 bg-border/60 mx-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={`h-9 w-9 rounded-[8px] transition-colors ${
                rightPanelOpen
                  ? "text-accent bg-elevated/40"
                  : "text-text-secondary hover:text-text-primary"
              }`}
              title="Contact Info Panel"
            >
              {rightPanelOpen ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
            </Button>
          </div>
        </header>

        {/* Message body container */}
        <section className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
          <div className="flex flex-col gap-1 items-center justify-center my-6">
            <span className="px-2.5 py-0.5 rounded-full bg-surface text-[10px] text-text-secondary font-medium tracking-wide uppercase border border-border/40">
              Security Encrypted
            </span>
            <p className="text-[10px] text-text-secondary/60 text-center max-w-[280px] mt-1">
              Messages are secured and synced locally using local states.
            </p>
          </div>

          {activeMessages.map((msg) => {
            const isMe = msg.sender === "me";
            return (
              <div
                key={msg.id}
                className={`flex w-full ${isMe ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div className={`max-w-[70%] ${isMe ? "order-1" : "order-2"}`}>
                  <div
                    className={`p-3 rounded-[12px] text-xs leading-relaxed shadow-sm break-words ${
                      isMe
                        ? "bg-accent text-background rounded-tr-none font-medium"
                        : "bg-surface text-text-primary rounded-tl-none border border-border/45"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-[9px] text-text-secondary/60 mt-1 ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="h-3 w-3 text-accent" />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Emulator */}
          {isTyping && (
            <div className="flex w-full justify-start animate-fade-in">
              <div className="flex items-center gap-2 bg-surface border border-border p-3 rounded-[12px] rounded-tl-none">
                <span className="text-[10px] text-text-secondary italic">
                  {activeConversation.name} is typing
                </span>
                <span className="flex gap-1">
                  <span className="h-1 w-1 bg-accent rounded-full animate-bounce delay-0" />
                  <span className="h-1 w-1 bg-accent rounded-full animate-bounce delay-150" />
                  <span className="h-1 w-1 bg-accent rounded-full animate-bounce delay-300" />
                </span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </section>

        {/* Bottom Input Area */}
        <footer className="p-3 bg-surface/50 border-t border-border flex flex-col gap-1.5 flex-shrink-0 z-20">
          
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            {/* Attachment Button */}
            <div className="relative">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowAttachmentModal(!showAttachmentModal)}
                className="text-text-secondary hover:text-text-primary h-9 w-9 rounded-[8px]"
                title="Attach Document"
              >
                <Paperclip className="h-4.5 w-4.5" />
              </Button>

              {/* Attachment Popover Simulator */}
              {showAttachmentModal && (
                <div className="absolute bottom-11 left-0 bg-surface border border-border rounded-[8px] shadow-2xl p-2.5 w-[200px] z-50 animate-fade-in">
                  <div className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-1.5 px-1 flex justify-between items-center">
                    <span>Simulate Upload</span>
                    <button type="button" onClick={() => setShowAttachmentModal(false)}>
                      <X className="h-3 w-3 text-text-secondary hover:text-text-primary" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => handleSimulateAttachment("Brand_Guidelines_v3.pdf", "4.8 MB")}
                      className="w-full text-left p-1.5 text-xs text-text-primary hover:bg-elevated rounded-[4px] flex items-center gap-2"
                    >
                      <FileText className="h-3.5 w-3.5 text-accent" />
                      <span className="truncate">Brand Guidelines.pdf</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateAttachment("Main_Interface.fig", "18.4 MB")}
                      className="w-full text-left p-1.5 text-xs text-text-primary hover:bg-elevated rounded-[4px] flex items-center gap-2"
                    >
                      <FileText className="h-3.5 w-3.5 text-accent" />
                      <span className="truncate">Main Interface.fig</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSimulateAttachment("Mockup_Details.png", "2.1 MB")}
                      className="w-full text-left p-1.5 text-xs text-text-primary hover:bg-elevated rounded-[4px] flex items-center gap-2"
                    >
                      <ImageIcon className="h-3.5 w-3.5 text-accent" />
                      <span className="truncate">Mockup Details.png</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Input field */}
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder={`Message ${activeConversation.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-surface border-border text-text-primary placeholder:text-text-secondary/40 text-xs h-9 pr-9"
              />
              
              {/* Emoji Picker Popover */}
              <div className="absolute right-1 top-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-text-secondary hover:text-text-primary h-9 w-9 rounded-[8px]"
                  title="Insert Emoji"
                >
                  <Smile className="h-4.5 w-4.5" />
                </Button>

                {showEmojiPicker && (
                  <div className="absolute bottom-11 right-0 bg-surface border border-border rounded-[8px] shadow-2xl p-2 w-[160px] z-50 animate-fade-in grid grid-cols-4 gap-1.5 justify-items-center">
                    {["☕", "✨", "🔥", "👍", "❤️", "💻", "🎉", "👀"].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleEmojiClick(emoji)}
                        className="text-lg p-1 hover:bg-elevated rounded-[4px] transition-colors focus:outline-none"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Send Button */}
            <Button
              type="submit"
              size="icon"
              className="bg-accent text-background hover:bg-accent-hover h-9 w-9 flex-shrink-0"
              title="Send Message"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </footer>
      </main>

      {/* 3. RIGHT COLLAPSIBLE INFO PANEL */}
      {rightPanelOpen && (
        <aside className="w-[260px] bg-surface border-l border-border h-full flex flex-col flex-shrink-0 animate-fade-in">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="text-xs font-semibold text-text-primary">Contact Details</span>
            <button
              onClick={() => setRightPanelOpen(false)}
              className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
            {/* Contact Avatar Card */}
            <div className="flex flex-col items-center text-center pb-4 border-b border-border/40">
              <Avatar
                fallback={activeConversation.fallback}
                isOnline={activeConversation.isOnline}
                size="lg"
                className="h-16 w-16 mb-3 text-lg"
              />
              <h3 className="text-sm font-semibold text-text-primary">{activeConversation.name}</h3>
              <p className="text-[11px] text-accent mt-0.5 font-medium">{activeConversation.role}</p>
              <p className="text-[10px] text-text-secondary/60 mt-1 truncate max-w-[200px]">
                {activeConversation.email}
              </p>
            </div>

            {/* Biography */}
            <div>
              <span className="text-[10px] uppercase font-semibold text-text-secondary tracking-wider block mb-1.5">
                Biography
              </span>
              <div className="bg-elevated/40 border border-border p-2.5 rounded-[8px]">
                <p className="text-[11px] text-text-primary/90 leading-relaxed font-normal">
                  {activeConversation.bio}
                </p>
              </div>
            </div>

            {/* Shared Files Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-semibold text-text-secondary tracking-wider">
                  Shared Files
                </span>
                <span className="text-[9px] text-text-secondary/65 font-semibold">
                  {activeConversation.sharedFiles.length} files
                </span>
              </div>
              
              <div className="space-y-1.5">
                {activeConversation.sharedFiles.length > 0 ? (
                  activeConversation.sharedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-elevated/20 hover:bg-elevated/55 border border-border/40 rounded-[8px] flex items-center justify-between gap-2 group transition-all"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="h-4 w-4 text-accent/80 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[11px] text-text-primary font-medium truncate pr-1 group-hover:text-accent transition-colors">
                            {file.name}
                          </p>
                          <span className="text-[9px] text-text-secondary/65 font-normal">
                            {file.size}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="text-text-secondary hover:text-text-primary p-1 focus:outline-none"
                        title="Download file"
                      >
                        <Download className="h-3 w-3" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-text-secondary/50 italic py-1">No shared documents yet</p>
                )}
              </div>
            </div>

            {/* Shared Media Grid */}
            {activeConversation.sharedMedia && activeConversation.sharedMedia.length > 0 && (
              <div>
                <span className="text-[10px] uppercase font-semibold text-text-secondary tracking-wider block mb-2">
                  Shared Media
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activeConversation.sharedMedia.map((url, idx) => (
                    <div
                      key={idx}
                      className="aspect-video bg-elevated rounded-[6px] overflow-hidden border border-border/50 group relative cursor-pointer"
                    >
                      <img
                        src={url}
                        alt="shared thumbnail"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Block Mute Panel */}
            <div className="pt-2 border-t border-border/40 space-y-1.5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
                className={`w-full justify-start text-left h-8 px-2 text-[11px] font-normal hover:bg-elevated rounded-[6px] ${
                  isMuted ? "text-accent" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {isMuted ? (
                  <>
                    <Volume2 className="h-3.5 w-3.5 mr-2 text-accent" />
                    <span>Unmute Notifications</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="h-3.5 w-3.5 mr-2 text-text-secondary" />
                    <span>Mute Notifications</span>
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsBlocked(!isBlocked)}
                className={`w-full justify-start text-left h-8 px-2 text-[11px] font-normal hover:bg-error/15 rounded-[6px] ${
                  isBlocked ? "text-error" : "text-text-secondary hover:text-error"
                }`}
              >
                <Ban className="h-3.5 w-3.5 mr-2" />
                <span>{isBlocked ? "Unblock Contact" : "Block Sarah Vance"}</span>
              </Button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
