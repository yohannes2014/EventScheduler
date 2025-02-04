module.exports = {
  content: [
    "./src/**/*.{ts,tsx}", // Adjust paths to match your files
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
    },
  },
  plugins: [],
}
