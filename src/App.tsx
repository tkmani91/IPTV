import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Tv, Radio, Film, Music, Search, ArrowLeft, Loader2 } from "lucide-react";

// চ্যানেল টাইপ ডেফিনিশন
interface Channel {
  id: string;
  name: string;
  category: string;
  url: string;
  logo: string;
  language: string;
}

// ডিফল্ট চ্যানেল লিস্ট
const defaultChannels: Channel[] = [
  // বাংলা নিউজ
  { id: "1", name: "সময় টিভি", category: "news", url: "https://ythls.armelin.one/channel/UCxHoBXkY88Tb8z1Ssj6CWsQ.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/4/41/Somoy_TV_Logo.png", language: "bn" },
  { id: "2", name: "একাত্তর টিভি", category: "news", url: "https://ythls.armelin.one/channel/UCtqvtAVmad5m8RTlQEP7Dnw.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/3/32/Ekattor_TV_logo.png", language: "bn" },
  { id: "3", name: "চ্যানেল আই", category: "news", url: "https://ythls.armelin.one/channel/UC8NcXMG3A3f2aFQyGTpSNww.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/88/Channel-i.svg", language: "bn" },
  { id: "4", name: "এনটিভি", category: "news", url: "https://ythls.armelin.one/channel/UC0V3IJCnr6ZNjB9t_GLhFFA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/4/4f/NTV_%28Bangladesh%29_logo.png", language: "bn" },
  { id: "5", name: "ইন্ডিপেন্ডেন্ট টিভি", category: "news", url: "https://ythls.armelin.one/channel/UCATUkaOHwO9EP_W87zCiPbA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/2/2f/Independent_Television_Logo.png", language: "bn" },
  { id: "6", name: "দেশ টিভি", category: "news", url: "https://ythls.armelin.one/channel/UCq8nF6YQ1Xq7J8P1w7x9Y1w.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/1/1d/Desh_TV_Logo.png", language: "bn" },
  { id: "7", name: "বাংলা টিভি", category: "news", url: "https://ythls.armelin.one/channel/UCG8Y_J4oIjzgoZx4R0L1R3g.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/Bangla_TV_Logo.png", language: "bn" },
  { id: "8", name: "মাছরাঙা টিভি", category: "news", url: "https://ythls.armelin.one/channel/UCN6sm8iHiPd0cnoUardDAnw.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/4/4f/Maasranga_Television_logo.png", language: "bn" },
  
  // বাংলা এন্টারটেইনমেন্ট
  { id: "9", name: "গাজী টিভি", category: "entertainment", url: "https://ythls.armelin.one/channel/UCXuHI23E_8QIDsvrp9rGXjQ.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/4/4f/Gazi_TV_Logo.png", language: "bn" },
  { id: "10", name: "বাংলাভিশন", category: "entertainment", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/Banglavision_Logo.png", language: "bn" },
  { id: "11", name: "এশিয়ান টিভি", category: "entertainment", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Asian_TV_Logo.png", language: "bn" },
  { id: "12", name: "সাউথ এশিয়ান টিভি", category: "entertainment", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/SATV_Logo.png", language: "bn" },
  
  // মুভি চ্যানেল
  { id: "13", name: "স্টার জলসা", category: "movies", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Star_Jalsha_logo_2019.png", language: "bn" },
  { id: "14", name: "জি বাংলা", category: "movies", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Zee_Bangla_logo.png", language: "bn" },
  { id: "15", name: "কালারস্ বাংলা", category: "movies", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Colors_Bangla_logo.png", language: "bn" },
  
  // মিউজিক চ্যানেল
  { id: "16", name: "চ্যানেল আই মিউজিক", category: "music", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Channel-i.svg", language: "bn" },
  
  // ইন্ডিয়ান চ্যানেল
  { id: "17", name: "স্টার প্লাস", category: "entertainment", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Star_Plus_logo.png", language: "hi" },
  { id: "18", name: "সনি টিভি", category: "entertainment", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Sony_Entertainment_Television_logo.png", language: "hi" },
  { id: "19", name: "কালারস্", category: "entertainment", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Colors_TV_logo.png", language: "hi" },
  { id: "20", name: "জি টিভি", category: "entertainment", url: "https://ythls.armelin.one/channel/UC2P5Fd5g41Gtdqf0U9xVHtA.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Zee_TV_logo.png", language: "hi" },
];

// ক্যাটাগরি লিস্ট
const categories = [
  { id: "all", name: "সব চ্যানেল", icon: Tv },
  { id: "news", name: "সংবাদ", icon: Radio },
  { id: "entertainment", name: "বিনোদন", icon: Tv },
  { id: "movies", name: "সিনেমা", icon: Film },
  { id: "music", name: "সঙ্গীত", icon: Music },
];

function App() {
  const [channels, setChannels] = useState<Channel[]>(defaultChannels);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [configUrl, setConfigUrl] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // গিটহাব থেকে কনফিগ লোড করুন
  const loadConfigFromGitHub = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // রো কন্টেন্ট URL কনভার্ট করুন
      let rawUrl = url;
      if (url.includes("github.com")) {
        rawUrl = url
          .replace("github.com", "raw.githubusercontent.com")
          .replace("/blob/", "/");
      }
      
      const response = await fetch(rawUrl);
      if (!response.ok) {
        throw new Error("কনফিগ লোড করতে ব্যর্থ");
      }
      
      const data = await response.json();
      if (data.channels && Array.isArray(data.channels)) {
        setChannels(data.channels);
        localStorage.setItem("iptv_channels", JSON.stringify(data.channels));
        localStorage.setItem("iptv_config_url", url);
        alert("চ্যানেল লিস্ট আপডেট হয়েছে!");
      } else {
        throw new Error("অবৈধ কনফিগ ফরম্যাট");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "অজানা ত্রুটি");
    } finally {
      setLoading(false);
    }
  };

  // লোকাল স্টোরেজ থেকে চ্যানেল লোড করুন
  useEffect(() => {
    const savedChannels = localStorage.getItem("iptv_channels");
    const savedConfigUrl = localStorage.getItem("iptv_config_url");
    
    if (savedChannels) {
      try {
        setChannels(JSON.parse(savedChannels));
      } catch {
        console.error("সেভড চ্যানেল পার্স করতে ব্যর্থ");
      }
    }
    
    if (savedConfigUrl) {
      setConfigUrl(savedConfigUrl);
    }
  }, []);

  // ভিডিও প্লে/পজ করুন
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // মিউট টগল করুন
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // ভলিউম চেঞ্জ করুন
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // ফুলস্ক্রিন করুন
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // কন্ট্রোল দেখান/লুকান
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // চ্যানেল সিলেক্ট করুন
  const selectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    setIsPlaying(true);
    setError(null);
    setLoading(true);
  };

  // ফিল্টারড চ্যানেল
  const filteredChannels = channels.filter((channel) => {
    const matchesCategory = currentCategory === "all" || channel.category === currentCategory;
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ভিডিও ইভেন্ট হ্যান্ডলার
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleWaiting = () => setLoading(true);
      const handlePlaying = () => setLoading(false);
      const handleError = () => {
        setError("চ্যানেল লোড করতে ব্যর্থ");
        setLoading(false);
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("waiting", handleWaiting);
      video.addEventListener("playing", handlePlaying);
      video.addEventListener("error", handleError);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("waiting", handleWaiting);
        video.removeEventListener("playing", handlePlaying);
        video.removeEventListener("error", handleError);
      };
    }
  }, [selectedChannel]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* হেডার */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Tv className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">বাংলা আইপি টিভি</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* সার্চ বার */}
      {showSearch && (
        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
          <div className="max-w-7xl mx-auto">
            <input
              type="text"
              placeholder="চ্যানেল খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* কনফিগ প্যানেল */}
      {showConfig && (
        <div className="bg-slate-800 px-4 py-4 border-b border-slate-700">
          <div className="max-w-7xl mx-auto space-y-3">
            <h3 className="text-lg font-semibold">গিটহাব কনফিগারেশন</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="গিটহাব রো JSON URL দিন..."
                value={configUrl}
                onChange={(e) => setConfigUrl(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => loadConfigFromGitHub(configUrl)}
                disabled={loading || !configUrl}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 rounded-lg font-medium transition-colors"
              >
                {loading ? "লোড হচ্ছে..." : "লোড করুন"}
              </button>
            </div>
            <p className="text-sm text-slate-400">
              উদাহরণ: https://raw.githubusercontent.com/username/repo/main/channels.json
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* ভিডিও প্লেয়ার */}
        <div className="flex-1 lg:w-2/3">
          <div 
            className="relative bg-black aspect-video"
            onMouseMove={handleMouseMove}
            onClick={handleMouseMove}
          >
            {selectedChannel ? (
              <>
                <video
                  ref={videoRef}
                  src={selectedChannel.url}
                  className="w-full h-full"
                  autoPlay
                  playsInline
                  onClick={togglePlay}
                />
                
                {/* লোডিং স্পিনার */}
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                  </div>
                )}
                
                {/* এরর মেসেজ */}
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <div className="text-center">
                      <p className="text-red-400 text-lg mb-2">{error}</p>
                      <button
                        onClick={() => selectChannel(selectedChannel)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                      >
                        আবার চেষ্টা করুন
                      </button>
                    </div>
                  </div>
                )}
                
                {/* কন্ট্রোলস */}
                {showControls && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    {/* টপ বার */}
                    <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setSelectedChannel(null)}
                          className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5" />
                          <span>ফিরে যান</span>
                        </button>
                        <h2 className="text-lg font-semibold">{selectedChannel.name}</h2>
                      </div>
                    </div>
                    
                    {/* সেন্টার প্লে বাটন */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8" />
                        ) : (
                          <Play className="w-8 h-8 ml-1" />
                        )}
                      </button>
                    </div>
                    
                    {/* বটম কন্ট্রোলস */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={togglePlay}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6" />
                          ) : (
                            <Play className="w-6 h-6" />
                          )}
                        </button>
                        
                        <button
                          onClick={toggleMute}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="w-6 h-6" />
                          ) : (
                            <Volume2 className="w-6 h-6" />
                          )}
                        </button>
                        
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24 accent-blue-500"
                        />
                        
                        <div className="flex-1" />
                        
                        <button
                          onClick={toggleFullscreen}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Maximize className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Tv className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                  <p className="text-slate-400 text-lg">চ্যানেল সিলেক্ট করুন</p>
                </div>
              </div>
            )}
          </div>
          
          {/* বর্তমান চ্যানেল ইনফো */}
          {selectedChannel && (
            <div className="p-4 bg-slate-800 border-b border-slate-700">
              <div className="flex items-center gap-4">
                <img
                  src={selectedChannel.logo}
                  alt={selectedChannel.name}
                  className="w-16 h-16 object-contain bg-white rounded-lg p-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='2' y='4' width='20' height='16' rx='2'/%3E%3Cpath d='M10 4v4'/%3E%3Cpath d='M2 8h20'/%3E%3Cpath d='M6 4v4'/%3E%3C/svg%3E";
                  }}
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedChannel.name}</h2>
                  <p className="text-slate-400 capitalize">{selectedChannel.category}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* চ্যানেল লিস্ট */}
        <div className="lg:w-1/3 bg-slate-800 border-l border-slate-700">
          {/* ক্যাটাগরি ট্যাবস */}
          <div className="flex overflow-x-auto p-2 gap-2 border-b border-slate-700">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setCurrentCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    currentCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* চ্যানেল গ্রিড */}
          <div className="p-4 h-[calc(100vh-300px)] lg:h-[calc(100vh-200px)] overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {filteredChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => selectChannel(channel)}
                  className={`p-3 rounded-lg border transition-all hover:scale-105 ${
                    selectedChannel?.id === channel.id
                      ? "bg-blue-600 border-blue-500"
                      : "bg-slate-700 border-slate-600 hover:bg-slate-600"
                  }`}
                >
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-full h-16 object-contain mb-2 bg-white rounded p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='2' y='4' width='20' height='16' rx='2'/%3E%3Cpath d='M10 4v4'/%3E%3Cpath d='M2 8h20'/%3E%3Cpath d='M6 4v4'/%3E%3C/svg%3E";
                    }}
                  />
                  <p className="text-sm font-medium truncate">{channel.name}</p>
                </button>
              ))}
            </div>
            
            {filteredChannels.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-400">কোন চ্যানেল পাওয়া যায়নি</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ফুটার */}
      <footer className="bg-slate-800 border-t border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 text-sm">
            বাংলা আইপি টিভি - গিটহাব থেকে ম্যানেজযোগ্য
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
