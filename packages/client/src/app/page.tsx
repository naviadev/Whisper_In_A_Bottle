import React from "react";

import View from "./(organism)/view/view";
import Minimap from "./(organism)/minimap/minimap";
import Joystick from "./(organism)/joystick";

import { AllProvider } from "./context/all_context";
import { SocketProvider } from "./context/socket_context";
import { ViewProvider } from "./(organism)/view/context/view.context";
import { MinimapProvider } from "./(organism)/minimap/context/minimap_context";

const Home: React.FC = () => {
  return (
    <div className="">
      <AllProvider>
        <SocketProvider>
          <div className="">
            <ViewProvider>
              <View />
            </ViewProvider>
          </div>
          <div>
            <MinimapProvider>
              <Minimap />
            </MinimapProvider>
            <Joystick />
          </div>
        </SocketProvider>
      </AllProvider>
    </div>
  );
};
export default Home;
