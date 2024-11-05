"use client";

import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";

const Input = styled(MuiInput)`
  width: 42px;
`;

const PrettoSlider = styled(Slider)({
  color: "#f9e05f",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#f9e05f",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

interface BackgroundMusicWithSliderProps {
  className: string;
}

export default function BackgroundMusicWithSlider({
  className,
}: BackgroundMusicWithSliderProps) {
  const [volume, setVolume] = useState(30);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        if (audioRef.current) {
          audioRef.current.play();
        }
      } catch (error) {
        console.log("권한 요청에 실패했습니다:", error);
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (volume < 0) {
      setVolume(0);
    } else if (volume > 100) {
      setVolume(100);
    }
  };

  return (
    <div className={className}>
      <Box sx={{ width: 150 }}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs>
            <PrettoSlider
              valueLabelDisplay="auto"
              aria-label="pretto slider"
              value={volume}
              onChange={handleSliderChange}
              min={0}
              max={100}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
