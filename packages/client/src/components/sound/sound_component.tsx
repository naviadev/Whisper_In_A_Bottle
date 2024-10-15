import React, { forwardRef } from "react";

interface SoundComponentProps {
  src: string;
  ref: React.Ref<HTMLAudioElement>;
  children?: React.ReactNode;
}

const SoundComponent = forwardRef<HTMLAudioElement, SoundComponentProps>(
  ({ src, children }, ref) => {
    return (
      <>
        <audio ref={ref} src={src} />
        {children}
      </>
    );
  }
);

SoundComponent.displayName = "SoundComponent";

export default SoundComponent;
