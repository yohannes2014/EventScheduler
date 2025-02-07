/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#020742",
        lightPrimary:"#0e1457",
        lightcancelBtn:"#99a38b",
        cancelBtn:"#abb898",
        submitBtn:"#272075",
        niceback:"#CDD1EA4D",
        nicebackDark:"#e8e9ed"
        
        
      },
      backdropBlur: {
        myBlur: '4px', 
      },
      screens: {
        'xxs': '180px', 
        '3xs': '300px', 
        '2xs': '350px', 
        '1xs': '400px', 
        'xs': '480px', 

        
      },
    },
  },
  plugins: [],
}

