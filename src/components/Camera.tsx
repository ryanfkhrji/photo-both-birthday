import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from "react";

type CameraProps = {
  onCapture: (img: string) => void;
};

export type CameraRef = {
  takePhoto: () => void;
};

const Camera = forwardRef<CameraRef, CameraProps>(({ onCapture }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user", // tetap kamera depan
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Tidak bisa mengakses kamera:", err);
      }
    };

    startCamera();

    const videoElement = videoRef.current;
    return () => {
      if (videoElement && videoElement.srcObject) {
        const tracks = (videoElement.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    takePhoto() {
      startCountdown();
    },
  }));

  const capture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // flip horizontal supaya hasil foto tidak mirror
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    }
    const img = canvas.toDataURL("image/png");
    onCapture(img);
  };

  const startCountdown = () => {
    setCountdown(3);
    let counter = 3;
    const interval = setInterval(() => {
      counter -= 1;
      if (counter > 0) {
        setCountdown(counter);
      } else {
        clearInterval(interval);
        setCountdown(null);
        capture();
      }
    }, 1000);
  };

  return (
    <div className="relative flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-80 h-80 bg-black rounded-lg object-cover"
        style={{
          transform: "scaleX(-1)", // balik preview supaya tidak mirror
        }}
      />
      {countdown && <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white bg-black/50 rounded-lg">{countdown}</div>}
    </div>
  );
});

export default Camera;
