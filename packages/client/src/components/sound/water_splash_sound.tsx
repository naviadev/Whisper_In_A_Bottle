import React, { forwardRef } from "react";
import SoundComponent from "./sound_component";

const WaterSplashSound = forwardRef<HTMLAudioElement>((props, ref) => {
  return <SoundComponent src="/water_splash.mp3" ref={ref} />;
});

WaterSplashSound.displayName = "WaterSplashSound";

export default WaterSplashSound;
