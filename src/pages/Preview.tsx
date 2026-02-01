import { faDownload, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import Frame from "../components/Frame";

const Preview = () => {
  const navigate = useNavigate();
  const [capturedImgs, setCapturedImgs] = useState<string[]>([]);
  const [selectedFrame, setSelectedFrame] = useState<string>("gradient-pink");
  const resultRef = useRef<HTMLDivElement>(null);
  const [sparkles, setSparkles] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([]);

  useEffect(() => {
    const storedImgs = JSON.parse(localStorage.getItem("photos") || "[]");

    if (!storedImgs.length) {
      navigate("/photo-booth");
      return;
    }

    setCapturedImgs(storedImgs);

    setSparkles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
      })),
    );
  }, [navigate]);

  const getFrameStyle = () => {
    const styles: Record<string, any> = {
      maroon: { background: "#8B1538" },
      "pink-soft": { background: "#F875AA" },
      "gradient-purple": {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      "gradient-pink": {
        background: "linear-gradient(135deg, #f472b6, #c084fc)",
      },
    };

    return styles[selectedFrame];
  };

  // ============================
  // DOWNLOAD IMAGE (FINAL)
  // ============================
  const downloadImage = async () => {
    if (!resultRef.current) return;

    try {
      const dataUrl = await toPng(resultRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "indahs-birthday.png";
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleRetry = () => {
    localStorage.removeItem("photos");
    navigate("/photo-booth");
  };

  return (
    <>
      {/* ================= ANIMATION STYLE ================= */}
      <style>{`
        @keyframes sparkle {
          0%,100%{opacity:0;transform:scale(0)}
          50%{opacity:1;transform:scale(1)}
        }
        @keyframes bounce {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-10px)}
        }
        .animate-sparkle{animation:sparkle 3s infinite}
        .animate-bounce{animation:bounce 2s infinite}
      `}</style>

      <div className="relative min-h-screen bg-[url('./assets/bg-pattern.png')] bg-cover flex items-center justify-center p-6 overflow-hidden">
        {/* Sparkles */}
        <div className="fixed inset-0 pointer-events-none z-10">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-sparkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-20 flex flex-col items-center w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="text-4xl animate-bounce">🎉</span>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Your Photos!</h1>
            </div>
            <p className="text-pink-400 font-semibold">Look how amazing you are 💖</p>
          </div>

          {/* ================= PHOTO RESULT ================= */}
          <div ref={resultRef} className="flex flex-col items-center gap-4 rounded-xl shadow-2xl" style={{ ...getFrameStyle(), padding: 24 }}>
            {/* Top Icons */}
            <div className="flex gap-3 text-3xl">🎂 🎀 💕 🎁 ✨</div>

            {/* Photos */}
            {capturedImgs.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} className="w-72 h-72 object-cover rounded-md shadow-lg" />
                <span className="absolute -top-2 -left-2 text-xl">🎀</span>
                <span className="absolute -top-2 -right-2 text-xl">🎀</span>
              </div>
            ))}

            {/* Bottom Text */}
            <div className="text-center text-white mt-2">
              <h3 className="text-2xl font-bold">Indah's Birthday 🎂</h3>
              <p className="text-lg">Special Moments ✨</p>
            </div>
          </div>

          {/* Frame Selector */}
          <Frame frame={selectedFrame} setFrame={setSelectedFrame} />

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <button onClick={downloadImage} className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-lg hover:scale-110 transition">
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Download
            </button>

            <button onClick={handleRetry} className="px-8 py-4 rounded-full bg-white font-bold text-pink-500 shadow-lg hover:scale-110 transition">
              <FontAwesomeIcon icon={faRetweet} className="mr-2" />
              Retake
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
