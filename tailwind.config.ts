import type { Config } from "tailwindcss";
const config: Config = { darkMode:["class"], content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"], theme:{extend:{colors:{midnight:"#071129",nebula:"#7c3aed",aqua:"#22d3ee",sunbeam:"#fbbf24"},borderRadius:{magic:"2rem"},boxShadow:{glow:"0 0 60px rgba(34,211,238,.24)"}}}, plugins:[require("tailwindcss-animate")]};
export default config;
