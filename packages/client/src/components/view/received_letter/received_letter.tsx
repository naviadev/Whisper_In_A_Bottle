import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ReceivedLetterView } from "./received_letter_view";
import { useSocket } from "@client/src/app/context/socket_context";

type ReceivedLetterPropType = {
  letterMessage: string;
  className?: string;
};

/**
 * * 도착한 편지가 나타나는 뷰
 * @param 소켓으로 도착한 메세지
 * @returns
 */
export const ReceivedLetter: React.FC<ReceivedLetterPropType> = ({
  letterMessage,
  className,
}) => {
  const socket = useSocket();

  const [receivedMessage, setReceivedMessage] = useState<string | null>(null);

  return (
    <div className="top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-[#D9D9D9]  bg-opacity-70 relative">
      <div className="w-[60%] h-[60%] relative flex justify-center">
        <ReceivedLetterView
          letterMessage={
            "여기에서 우리는 다양한 주제를 무작위로 이야기할 수 있습니다. 예를 들어, 바다 속의 생태계는 매우 복잡하고 아름답습니다. 다양한 종류의 물고기와 해양 생물이 공존하며, 상호작용을 통해 균형을 유지합니다. 또 다른 흥미로운 주제는 우주의 신비입니다. 끝없이 펼쳐진 우주는 아직 인간에게 많은 비밀을 감추고 있으며, 우리는 끊임없이 이를 탐구하고 있습니다. 밤하늘의 별을 바라보며 우주에 대해 상상하는 것은 매우 낭만적입니다. 인류는 우주 탐사를 통해 새로운 행성을 발견하고, 언젠가 다른 행성에 거주할 가능성을 열어가고 있습니다. 우리가 매일 사용하는 기술, 예를 들어 스마트폰이나 컴퓨터는 불과 몇십 년 전만 해도 상상할 수 없었던 혁신적인 도구들입니다. 빠르게 발전하는 기술 덕분에 우리는 전 세계와 즉각적으로 연결될 수 있고, 정보를 손쉽게 공유할 수 있습니다."
          }
          className="z-10 absolute w-[60%] h-full overflow-y-auto p-4 text-black"
        />
        {/* TODO 삭제, 저장 버튼 추가 */}
        <Image
          src="/ParchmentLetter.jpeg"
          alt="편지 배경"
          layout="fill"
          objectFit="cover"
          // width={1000}
          // height={100}
          className="absolute z-0 rotate-90"
        />
      </div>
    </div>
  );
};
