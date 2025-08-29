import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "#7F07B5",
        "gradient-conic":
          "#7F07B5",
      },
      colors: {
      
        brandblack: "#273339",
        brandwhite: "#FFFFFF",
        brandpurple: "#7F07B5",
        paragraphtext: "#57545C",
        brandcolortwo: "#7F07B5",
        fadedbrandbg: "#F2EEF1",
        linkcolor: "#7c4dff"
        
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        
      },
      fontSize: {
       
        xs: "12px",   
        sm: "12.7px", 
        base: "13.7px",    
        lg: "18px",  
        xl: "20px",   
        "2xl": "24px", 
        "3xl": "30px", 
        "4xl": "36px", 
        "5xl": "48px", 
        "6xl": "60px", 
        "7xl": "72px", 
        
      },
    },
  },
  plugins: [],
};

export default config;
