"use client";

import React from "react";

import View from "./(organism)/view/view";
import Minimap from "./(organism)/minimap/minimap";
import Joystick from "./(organism)/joystick/joystick";

import { AllProvider } from "./context/all_context";
import { SocketProvider } from "./context/socket_context";
import { ViewProvider } from "./(organism)/view/context/view_context";
import { MinimapProvider } from "./(organism)/minimap/context/minimap_context";
import { JoysitckProvider } from "./(organism)/joystick/context/joystick_context";

const Home: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-[2.6fr_1fr] bg-[#727272]">
      <AllProvider>
        <SocketProvider>
          <ViewProvider>
            <div className="view-container h-full mr-2 overflow-hidden">
              <View />
            </div>
            <div className="grid grid-rows-2">
              <div className="minimap-container">
                <MinimapProvider>
                  <Minimap />
                </MinimapProvider>
              </div>
              <JoysitckProvider>
                <Joystick />
              </JoysitckProvider>
            </div>
          </ViewProvider>
        </SocketProvider>
      </AllProvider>
    </div>
  );
};
export default Home;
