import React from "react";

import View from "./(organism)/view/view";
import Minimap from "./(organism)/minimap/minimap";
// import Joystick from "./(organism)/joystick/joystick";

import { AllProvider } from "./context/all_context";
import { SocketProvider } from "./context/socket_context";
import { ViewProvider } from "./(organism)/view/context/view.context";
import { MinimapProvider } from "./(organism)/minimap/context/minimap_context";

const Home: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-row relative">
      <AllProvider>
        <SocketProvider>
          <div className="view-container">
            <ViewProvider>
              <View />
            </ViewProvider>
          </div>
          <div>
            <div className="minimap-container">
              <MinimapProvider>
                <Minimap />
              </MinimapProvider>
            </div>
            <div className="w-60 h-40 bg-zinc-200 absolute left-[77%] top-[55%] rounded-xl">
              {/* <Joystick /> */}
            </div>
          </div>
        </SocketProvider>
      </AllProvider>
    </div>
  );
};
export default Home;
