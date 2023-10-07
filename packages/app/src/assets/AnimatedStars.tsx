const AnimatedStars = () => (
  <svg
    version="1.2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 66 56"
    width="59"
    height="50"
  >
    <defs>
      <linearGradient id="Gradient1">
        <stop className="stop1" offset="0%" />
        <stop className="stop2" offset="50%" />
        <stop className="stop3" offset="50%" />
      </linearGradient>
      <linearGradient id="Gradient2">
        <stop className="stop2" offset="0%" />
        <stop className="stop3" offset="50%" />
        <stop className="stop4" offset="100%" />
      </linearGradient>
      <linearGradient id="Gradient3">
        <stop className="stop3" offset="0%" />
        <stop className="stop4" offset="25%" />
        <stop className="stop5" offset="50%" />
        <stop className="stop6" offset="75%" />
        <stop className="stop7" offset="100%" />
      </linearGradient>
      <linearGradient id="Gradient4">
        <stop className="stop7" offset="0%" />
        <stop className="stop8" offset="50%" />
        <stop className="stop9" offset="100%" />
      </linearGradient>
      <linearGradient id="Gradient5">
        <stop className="stop9" offset="0%" />
        <stop className="stop10" offset="50%" />
        <stop className="stop11" offset="100%" />
      </linearGradient>
    </defs>
    <style>
      {`
          .stop1 {
            stop-color: #9fc823;
          }
          .stop2 {
            stop-color: #92bc28;
          }
          .stop3 {
            stop-color: #8fba29;
          }
          .stop4 {
            stop-color: #80ac30;
          }
          .stop5 {
            stop-color: #69973c;
          }
          .stop6 {
            stop-color: #538346;
          }
          .stop7 {
            stop-color: #568545;
          }
          .stop8 {
            stop-color: #49794b;
          }
          .stop9 {
            stop-color: #42734f;
          }
          .stop10 {
            stop-color: #2f6156;
          }
          .stop11 {
            stop-color: #22555d;
          }
        @keyframes starAnimation1 {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes starAnimation2 {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes starAnimation3 {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animated-star1 {
          animation: starAnimation1 2s infinite;
          transform-origin: center center;
        }

        .animated-star2 {
          animation: starAnimation2 2s infinite;
          transform-origin: center center;
        }

        .animated-star3 {
          animation: starAnimation3 1s infinite;
          transform-origin: center center;
        }

        .star1 {
          animation-delay: 0.8s;
        }

        .star2 {
          animation-delay: 1.6s;
        }
        .star3 {
          animation-delay: 0.2s;
        }
      `}
    </style>
    <path
      fill="url(#Gradient3)"
      className="animated-star1 star1"
      d="m55.5 25.5c0 0.7-0.4 1.2-1 1.5l-9 3.4c-3.1 1.2-5.6 3.8-6.8 7l-3.4 9.4c0 0.1-0.1 0.1-0.1 0.2q-0.1 0.1-0.1 0.1-0.1 0.2-0.2 0.2-0.2 0.2-0.4 0.3-0.1 0-0.2 0-0.1 0.1-0.3 0.1l-0.2-0.1q-0.1 0-0.3 0-0.2-0.1-0.4-0.3-0.1-0.1-0.1-0.2 0 0-0.1-0.1-0.1-0.1-0.1-0.2l-3.5-9.4c-1.1-3.2-3.6-5.8-6.8-7l-9-3.4c-0.6-0.3-0.9-0.8-0.9-1.5 0-0.6 0.4-1.2 1-1.4l8.3-2.6c3.5-1.1 6.3-3.9 7.5-7.4l3.4-9.9q0.1-0.2 0.2-0.4 0-0.1 0.1-0.1 0.2-0.2 0.5-0.3 0-0.1 0.1-0.1 0.1 0 0.3 0 0.2 0 0.3 0 0.1 0 0.2 0.1 0.2 0 0.4 0.3 0.1 0 0.2 0.1 0.1 0.2 0.2 0.4l3.3 9.9c1.2 3.5 4 6.3 7.6 7.4l8.2 2.6c0.6 0.2 1.1 0.8 1.1 1.4z"
    />

    <path
      fill="url(#Gradient2)"
      className="animated-star2 star3"
      d="m25.5 7.7c0 0.2-0.2 0.4-0.4 0.5l-3.4 1.2c-1.2 0.4-2.1 1.3-2.5 2.4l-1.3 3.2q0 0-0.1 0.1 0 0 0 0 0 0.1-0.1 0.1 0 0.1-0.1 0.1-0.1 0-0.1 0-0.1 0-0.1 0h-0.1q0 0-0.1 0 0 0-0.1-0.1 0 0-0.1-0.1 0 0 0 0 0-0.1-0.1-0.1l-1.2-3.2c-0.5-1.1-1.4-2-2.6-2.4l-3.4-1.2c-0.2-0.1-0.3-0.3-0.3-0.5 0-0.2 0.1-0.4 0.3-0.5l3.1-0.9c1.4-0.3 2.4-1.3 2.9-2.5l1.3-3.4q0 0 0-0.1 0 0 0.1-0.1 0 0 0.2-0.1 0 0 0 0 0 0 0.1 0 0.1 0 0.1 0 0 0 0.1 0 0.1 0.1 0.2 0.1 0 0.1 0 0.1 0.1 0 0.1 0.1l1.2 3.4c0.5 1.2 1.5 2.2 2.9 2.5l3.1 0.9c0.2 0.1 0.4 0.3 0.4 0.5z"
    />
    <path
      fill="url(#Gradient4)"
      className="animated-star3 star2"
      d="m58.4 42.8q0 0.2-0.3 0.4l-2.6 1c-0.9 0.3-1.6 1-1.9 1.9l-1 2.7q0 0.1 0 0.1 0 0 0 0-0.1 0.1-0.1 0.1 0 0-0.1 0.1 0 0-0.1 0 0 0 0 0h-0.1q-0.1 0-0.1 0-0.1-0.1-0.1-0.1 0 0-0.1-0.1 0 0 0-0.1l-1-2.7c-0.3-0.9-1-1.6-1.9-1.9l-2.6-1q-0.3-0.2-0.3-0.4c0-0.2 0.2-0.4 0.3-0.5l2.3-0.7c1.1-0.3 1.9-1.1 2.3-2.1l0.9-2.9q0 0 0 0 0 0 0.1-0.1 0 0 0.1-0.1 0 0 0.1 0 0 0 0 0 0.1 0 0.1 0 0.1 0 0.1 0 0.1 0.1 0.1 0.1 0 0 0.1 0.1 0 0 0 0l0.9 2.9c0.4 1 1.2 1.8 2.2 2.1l2.4 0.7c0.1 0.1 0.3 0.3 0.3 0.5z"
    />

    <path
      fill="url(#Gradient4)"
      className="animated-star3 star1"
      d="m54.2 13.3c-1.5 0-2.6-1.1-2.6-2.5 0-1.4 1.1-2.5 2.6-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5z"
    />
    <path
      fill="url(#Gradient2)"
      className="animated-star3 star1"
      d="m11.4 55.6c-1.4 0-2.5-1.1-2.5-2.5 0-1.5 1.1-2.6 2.5-2.6 1.4 0 2.6 1.1 2.6 2.6 0 1.4-1.2 2.5-2.6 2.5z"
    />
    <path
      fill="url(#Gradient1)"
      className="animated-star3 star2"
      d="m1.5 31.4c-0.8 0-1.4-0.6-1.4-1.4 0-0.7 0.6-1.3 1.4-1.3 0.7 0 1.3 0.6 1.3 1.3 0 0.8-0.6 1.4-1.3 1.4z"
    />
    <path
      fill="url(#Gradient5)"
      className="animated-star3 star3"
      d="m63.8 22.8c-0.9 0-1.7-0.7-1.7-1.6 0-1 0.8-1.7 1.7-1.7 0.9 0 1.7 0.7 1.7 1.7 0 0.9-0.8 1.6-1.7 1.6z"
    />
    <path
      fill="url(#Gradient5)"
      className="animated-star3 star1"
      d="m60.5 6.6c-1 0-1.7-0.7-1.7-1.7 0-0.9 0.7-1.6 1.7-1.6 0.9 0 1.6 0.7 1.6 1.6 0 1-0.7 1.7-1.6 1.7z"
    />
    <path
      fill="url(#Gradient2)"
      className="animated-star3 star2"
      d="m15.6 43c-0.9 0-1.6-0.7-1.6-1.6 0-0.9 0.7-1.6 1.6-1.6 1 0 1.7 0.7 1.7 1.6 0 0.9-0.7 1.6-1.7 1.6z"
    />
  </svg>
)
export default AnimatedStars
