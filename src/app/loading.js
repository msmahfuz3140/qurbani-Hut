"use client";

const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-stone-100 px-4">

      <div className="flex flex-col items-center text-center">

        {/* LOGO */}
        <div className="relative mb-10">

          {/* rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-orange-200 animate-spin-slow"></div>

          {/* center circle */}
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-white shadow-xl flex items-center justify-center border border-orange-100">
            <span className="text-orange-500 text-xl md:text-2xl font-black tracking-widest animate-pulse">
              QH
            </span>
          </div>
        </div>

        {/* BRAND NAME */}
        <h2 className="text-2xl md:text-3xl font-black text-stone-900 tracking-wide mb-3">
          QurbaniHut
        </h2>

        {/* SHIMMER TEXT */}
        <p className="relative text-stone-600 font-medium overflow-hidden">
          <span className="loading-text">
            Preparing livestock marketplace...
          </span>
        </p>

        {/* DOT LOADER */}
        <div className="flex gap-2 mt-6">
          <span className="dot"></span>
          <span className="dot delay-150"></span>
          <span className="dot delay-300"></span>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx global>{`

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }

        /* shimmer text */
        .loading-text {
          background: linear-gradient(
            90deg,
            #888 25%,
            #000 50%,
            #888 75%
          );
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmer 2s linear infinite;
        }

        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }

        /* dots */
        .dot {
          width: 10px;
          height: 10px;
          background: #f97316;
          border-radius: 9999px;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .delay-150 {
          animation-delay: 0.15s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0.7);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

      `}</style>
    </div>
  );
};

export default loading;