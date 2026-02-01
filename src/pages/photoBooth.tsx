import { useNavigate } from "react-router";
import { useRef, useState, useEffect } from "react";
import Camera from "../components/Camera";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

interface CameraRef {
  takePhoto: () => void;
}

const PhotoBooth = () => {
  const navigate = useNavigate();
  const cameraRef = useRef<CameraRef>(null);
  const [resetKey] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([]);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setSparkles(newSparkles);
  }, []);

  const handleTakePhoto = (img: string) => {
    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 500);

    const newPhotos = [...photos, img];
    setPhotos(newPhotos);

    if (newPhotos.length >= 3) {
      localStorage.setItem("photos", JSON.stringify(newPhotos));
      setTimeout(() => navigate("/preview"), 800);
    }
  };

  const handleCapture = () => {
    cameraRef.current?.takePhoto();
  };

  return (
    <>
      <style>{`
        @keyframes floatHeart {
          0% {
            bottom: -10%;
            opacity: 0;
            transform: translateX(0) rotate(0deg);
          }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% {
            bottom: 110%;
            opacity: 0;
            transform: translateX(100px) rotate(360deg);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.7;
          }
        }

        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }

        @keyframes flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes popIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-float-heart { animation: floatHeart 15s infinite ease-in-out; }
        .animate-sparkle { animation: sparkle 3s infinite ease-in-out; }
        .animate-bounce-icon { animation: bounce 2s infinite ease-in-out; }
        .animate-rotate-slow { animation: rotate 10s infinite linear; }
        .animate-pulse-icon { animation: pulse 2s infinite ease-in-out; }
        .animate-swing { animation: swing 2s infinite ease-in-out; }
        .animate-wiggle { animation: wiggle 1s infinite ease-in-out; }
        .animate-flash { animation: flash 0.3s ease-out; }
        .animate-pop-in { animation: popIn 0.4s ease-out; }
      `}</style>

      <div className="relative bg-[url('./assets/bg-pattern.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-screen overflow-hidden p-6">
        {/* Flash Effect */}
        {isCapturing && (
          <div className="fixed inset-0 bg-white z-50 animate-flash pointer-events-none" />
        )}

        {/* Floating Hearts & Emojis */}
        <div className="fixed inset-0 pointer-events-none z-10">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-2xl animate-float-heart opacity-0"
              style={{
                left: `${15 + i * 15}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              {['💕', '💖', '✨', '🎀', '🌸', '🎂'][i % 6]}
            </div>
          ))}
        </div>

        {/* Sparkles */}
        <div className="fixed inset-0 pointer-events-none z-20">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-sparkle"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                animationDelay: `${sparkle.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-30 flex min-h-screen flex-col items-center justify-center w-full md:max-w-2xl mx-auto px-4 md:px-0">

          {/* Title with Animation */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-4xl animate-bounce-icon">📸</span>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-heading bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Say Cheese!
              </h1>
              <span className="text-4xl animate-bounce-icon" style={{ animationDelay: '0.2s' }}>✨</span>
            </div>
            <h4 className="text-lg font-sans bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent font-semibold">
              Strike your best pose! 💝
            </h4>
          </div>

          {/* Camera Frame Container */}
          <div className="relative mb-8">
            {/* Large Decorative Icons - Rotating around camera */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl animate-bounce-icon z-10">🎀</div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-5xl animate-pulse-icon z-10">💖</div>

            <div className="absolute top-1/2 -translate-y-1/2 -left-12 text-5xl animate-rotate-slow z-10">🌟</div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-12 text-5xl animate-rotate-slow z-10" style={{ animationDirection: 'reverse' }}>✨</div>

            {/* Corner Icons */}
            <div className="absolute -top-8 -left-8 text-3xl animate-swing z-10">🦋</div>
            <div className="absolute -top-8 -right-8 text-3xl animate-swing z-10" style={{ animationDelay: '0.5s' }}>🌺</div>
            <div className="absolute -bottom-8 -left-8 text-3xl animate-wiggle z-10">🌸</div>
            <div className="absolute -bottom-8 -right-8 text-3xl animate-wiggle z-10" style={{ animationDelay: '0.3s' }}>🎂</div>

            {/* Side Icons - More decorations */}
            <div className="absolute top-1/4 -left-10 text-3xl animate-pulse-icon z-10">💕</div>
            <div className="absolute top-3/4 -left-10 text-3xl animate-bounce-icon z-10" style={{ animationDelay: '0.4s' }}>🎁</div>
            <div className="absolute top-1/4 -right-10 text-3xl animate-pulse-icon z-10" style={{ animationDelay: '0.6s' }}>💝</div>
            <div className="absolute top-3/4 -right-10 text-3xl animate-bounce-icon z-10" style={{ animationDelay: '0.2s' }}>🎈</div>

            {/* Camera Frame with Gradient Border */}
            <div className="relative p-3 bg-gradient-to-br from-pink-400 via-purple-400 to-pink-400 rounded-[2rem] shadow-2xl">
              {/* Inner white border */}
              <div className="bg-white rounded-[1.5rem] p-2 shadow-inner">
                {/* Camera component container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <Camera key={resetKey} ref={cameraRef} onCapture={handleTakePhoto} />
                </div>
              </div>

              {/* Frame corner decorations */}
              <div className="absolute top-1 left-1 text-xl">🎀</div>
              <div className="absolute top-1 right-1 text-xl">🎀</div>
              <div className="absolute bottom-1 left-1 text-xl">🎀</div>
              <div className="absolute bottom-1 right-1 text-xl">🎀</div>
            </div>
          </div>

          {/* Capture Button - Big and Cute */}
          <button
            onClick={handleCapture}
            disabled={isCapturing}
            className="mb-6 rounded-full bg-gradient-to-r from-pink-400 via-red-400 to-pink-400 px-12 py-5 font-bold text-white cursor-pointer shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/70 hover:scale-110 transition-all duration-300 active:scale-95 text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faCamera} className="mr-3" />
            {isCapturing ? 'Capturing... ✨' : 'Take Photo!'}
          </button>

          {/* Photo Counter - Cute Progress Display */}
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl px-8 py-4 shadow-xl">
              {/* Decorations on counter */}
              <div className="absolute -top-3 -left-3 text-3xl animate-swing">🎁</div>
              <div className="absolute -top-3 -right-3 text-3xl animate-swing" style={{ animationDelay: '0.3s' }}>🎁</div>

              <div className="text-center">
                <p className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  Photo Progress
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-gray-700 font-semibold text-xl">{photos.length} / 3</span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className="text-2xl">
                        {i < photos.length ? '📷' : '⚪'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Progress Indicator */}
          {photos.length > 0 && (
            <div className="mt-6 flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    i < photos.length ? 'animate-pop-in' : ''
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${
                      i < photos.length
                        ? 'bg-gradient-to-br from-pink-400 to-purple-400 scale-110 shadow-lg shadow-pink-400/50'
                        : 'bg-gray-200/50 scale-100'
                    }`}
                  >
                    {i < photos.length ? '✅' : '📷'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Motivational Text */}
          {photos.length === 0 && (
            <p className="mt-6 text-center text-white/80 font-sans max-w-md text-sm">
              🌟 Get ready to make beautiful memories! 🌟
            </p>
          )}
          {photos.length === 1 && (
            <p className="mt-6 text-center text-white/80 font-sans max-w-md animate-pop-in">
              💕 Great! Two more to go! 💕
            </p>
          )}
          {photos.length === 2 && (
            <p className="mt-6 text-center text-white/80 font-sans max-w-md animate-pop-in">
              🎉 Almost there! One last pose! 🎉
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PhotoBooth;