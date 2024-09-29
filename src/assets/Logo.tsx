import React from 'react';

function Logo({...props} : {width?: string} & React.HTMLProps<HTMLImageElement>) {
    return (
      <img src="https://www.pngfind.com/pngs/m/273-2733257_icon-weather-portal-comments-weather-icons-png-white.png" alt="Weather" {...props} />
    )
  }
  
  export default Logo