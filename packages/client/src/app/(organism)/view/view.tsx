import React from "react";
import { CanvasComponent } from "@client/src/components/view/canvas/canvas";

const View: React.FC = () => {
  return (
    <main className="h-full w-full">
      <CanvasComponent />
    </main>
  );
};

export default View;
