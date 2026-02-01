import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const Home = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random sparkles
    const newSparkles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatHeart {
          0% {
            bottom: -10%;
            opacity: 0;
            transform: translateX(0) rotate(0deg);
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
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

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(10deg);
          }
          75% {
            transform: rotate(-10deg);
          }
        }

        @keyframes camera {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes spinSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spinSlowReverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }

        .animate-float-heart {
          animation: floatHeart 15s infinite ease-in-out;
        }

        .animate-sparkle {
          animation: sparkle 3s infinite ease-in-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s infinite ease-in-out;
        }

        .animate-wiggle {
          animation: wiggle 1s infinite ease-in-out;
        }

        .animate-camera {
          animation: camera 1.5s infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulseSlow 2s infinite ease-in-out;
        }

        .animate-spin-slow {
          animation: spinSlow 10s infinite linear;
        }

        .animate-spin-slow-reverse {
          animation: spinSlowReverse 8s infinite linear;
        }
      `}</style>

      <div className="relative bg-[url('./assets/bg-pattern.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-screen overflow-hidden">
        {/* Floating Hearts */}
        <div className="fixed inset-0 pointer-events-none z-10">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-2xl animate-float-heart opacity-0"
              style={{
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.7}s`,
              }}
            >
              {["💕", "💖", "💗", "💝"][i % 4]}
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
        <div className="relative z-30 flex min-h-screen flex-col items-center justify-center w-full md:max-w-xl mx-auto px-4 md:px-0">
          {/* Card Container with cute styling */}
          <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-2xl animate-fade-in-up">
            {/* Decorative Elements */}
            <div className="absolute -top-3 -left-3 text-4xl animate-spin-slow">🌸</div>
            <div className="absolute -top-3 -right-3 text-4xl animate-spin-slow-reverse">🦋</div>
            <div className="absolute -bottom-3 -left-3 text-4xl animate-spin-slow">🌺</div>
            <div className="absolute -bottom-3 -right-3 text-4xl animate-spin-slow-reverse">✨</div>

            {/* Big Camera Icon with bounce */}
            <div className="text-7xl mb-6 text-center animate-bounce-slow">📸</div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading text-center bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Happy Birthday <strong>Indah Febriyanti!</strong>
            </h1>

            {/* Gift Icons */}
            <div className="flex justify-center gap-3 mb-5">
              <span className="text-3xl animate-wiggle">🎁</span>
              <span className="text-3xl animate-wiggle" style={{ animationDelay: "0.2s" }}>
                🎀
              </span>
              <span className="text-3xl animate-wiggle" style={{ animationDelay: "0.4s" }}>
                🎂
              </span>
            </div>

            {/* Subtitle */}
            <h4 className="text-base md:text-lg font-sans text-center text-gray-700 mb-8">
              Capture your <span className="font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent underline decoration-pink-400 decoration-4 animate-pulse-slow md:text-lg text-base">special moment</span>
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-600 text-center mb-8 max-w-md mx-auto leading-relaxed">
              Di hari istimewamu yang ke-<strong className="text-pink-500">23</strong> ini, aku ingin memberimu kenangan indah yang bisa kita simpan selamanya. Yuk ambil foto lucu dan cantikmu! 💝✨
            </p>

            {/* Button */}
            <Link to="/photo-booth">
              <button className="mt-2 w-full md:w-auto mx-auto block rounded-full bg-gradient-to-r from-pink-400 to-red-400 px-8 py-4 font-semibold text-white cursor-pointer shadow-lg shadow-pink-400/50 hover:shadow-xl hover:shadow-pink-400/60 hover:-translate-y-1 transition-all duration-300 active:translate-y-0 md:text-lg text-base">
                Ambil Foto Sekarang <FontAwesomeIcon icon={faCamera} className="ml-2 animate-camera inline-block" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;