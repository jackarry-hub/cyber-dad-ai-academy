/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cyber-bg": "#FFF7ED",
        "cyber-deep": "#EEF6FF",
        "cyber-panel": "rgba(255, 255, 255, 0.9)",
        "cyber-card": "rgba(255, 255, 255, 0.92)",
        "cyber-blue": "#3B82F6",
        "cyber-cyan": "#3B82F6",
        "cyber-purple": "#7B61FF",
        "cyber-yellow": "#FFD166",
        "cyber-green": "#47C58A",
        "cyber-red": "#FF5C7A",
        "cyber-text": "#17233D",
        "cyber-muted": "#6B7280",
        "cyber-weak": "#8A94A6",
        "cyber-border": "rgba(210, 220, 245, 0.9)",
        cyber: {
          bg: "#FFF7ED",
          deep: "#EEF6FF",
          panel: "rgba(255, 255, 255, 0.9)",
          card: "rgba(255, 255, 255, 0.92)",
          cyan: "#3B82F6",
          blue: "#3B82F6",
          purple: "#7B61FF",
          violet: "#7B61FF",
          yellow: "#FFD166",
          gold: "#FFD166",
          green: "#47C58A",
          red: "#FF5C7A",
          text: "#17233D",
          muted: "#6B7280",
          weak: "#8A94A6",
          border: "rgba(210, 220, 245, 0.9)",
        },
      },
      boxShadow: {
        glow: "0 14px 30px rgba(91, 124, 242, 0.16)",
        "glow-soft": "0 12px 28px rgba(90, 105, 160, 0.12)",
        "glow-blue": "0 14px 30px rgba(91, 124, 242, 0.16)",
        "glow-cyan": "0 12px 28px rgba(59, 130, 246, 0.14)",
        "card-inner":
          "0 16px 40px rgba(90,105,160,0.10), inset 0 1px 0 rgba(255,255,255,0.96)",
        "button-glow": "0 10px 24px rgba(91, 124, 242, 0.24)",
      },
      backgroundImage: {
        "cyber-radial":
          "radial-gradient(circle at 12% 8%, rgba(255, 221, 190, 0.55), transparent 32%), radial-gradient(circle at 90% 12%, rgba(214, 226, 255, 0.75), transparent 36%), linear-gradient(180deg, #FFF7ED 0%, #F8F1FF 48%, #EEF6FF 100%)",
        "blue-glow": "linear-gradient(135deg, #7B61FF 0%, #3B82F6 100%)",
        "panel-glow":
          "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(242,246,255,0.88)), radial-gradient(circle at 85% 20%, rgba(196,181,253,0.28), transparent 35%)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
