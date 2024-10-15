"use client";

import React, { forwardRef } from "react";
import SoundComponent from "./sound_component";

const PaperSound = forwardRef<HTMLAudioElement>((props, ref) => {
  return <SoundComponent src="/paper.mp3" ref={ref} />;
});

PaperSound.displayName = "PaperSound";

export default PaperSound;
