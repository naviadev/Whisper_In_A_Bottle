"use client";

import React, { forwardRef } from "react";
import SoundComponent from "./sound_component";

const CorkSound = forwardRef<HTMLAudioElement>((props, ref) => {
  return <SoundComponent src="/cork.mp3" ref={ref} />;
});

CorkSound.displayName = "CorkSound";

export default CorkSound;
