import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FrameSelectorProps = {
  frame: string;
  setFrame: (f: string) => void;
};

const Frame = ({ frame, setFrame }: FrameSelectorProps) => {
  const frames = [
    {
      id: "maroon",
      label: "Maroon",
      style: {
        background: "#8B1538",
      },
      icon: "🎀",
    },
    {
      id: "pink-soft",
      label: "Soft Pink",
      style: {
        background: "#F875AA",
      },
      icon: "🌸",
    },
    {
      id: "gradient-purple",
      label: "Purple Gradient",
      style: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      icon: "💜",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }

        @keyframes bounce-small {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .frame-option:hover .frame-icon {
          animation: wiggle 0.5s ease-in-out;
        }

        .frame-option-selected .frame-icon {
          animation: bounce-small 1s infinite ease-in-out;
        }
      `}</style>

      <div className="mt-6">
        {/* Title */}
        <div className="text-center mb-4">
          <p className="text-lg font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Choose Your Frame Color 🎨</p>
        </div>

        {/* Frame Options */}
        <div className="flex flex-wrap gap-4 justify-center">
          {frames.map((f) => (
            <div key={f.id} onClick={() => setFrame(f.id)} className={`frame-option ${frame === f.id ? "frame-option-selected" : ""} relative cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95`}>
              {/* Frame color box */}
              <div
                className={`w-20 h-20 rounded-2xl shadow-lg flex flex-col items-center justify-center border-4 transition-all duration-300 ${frame === f.id ? "border-white shadow-xl scale-110" : "border-pink-200 hover:border-pink-300"}`}
                style={f.style}
              >
                {/* Icon */}
                <span className="frame-icon text-3xl mb-1">{f.icon}</span>

                {/* Check mark if selected */}
                {frame === f.id && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <FontAwesomeIcon icon={faCheck} className="text-pink-500 text-sm" />
                  </div>
                )}
              </div>

              {/* Label */}
              <p className="text-center mt-2 text-sm font-semibold text-gray-700">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Frame;
