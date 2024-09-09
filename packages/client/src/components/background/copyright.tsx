import React from "react";

export const CopyRight: React.FC = () => {
  return (
    <div className="flex flex-row h-full items-center">
      <div className="w-fit flex flex-row gap-2">
        <div className="text-copyright-yellow text-xs">ⓒ</div>
        <div className="text-copyright-yellow text-xs">copyright</div>
        <div className="flex flex-row gap-2">
          <p className="text-copyright-text text-xs opacity-50 hover:opacity-100">
            <a
              href="https://github.com/moonhr"
              target="_blank"
              rel="noopener noreferrer"
            >
              moontchling
            </a>
          </p>
          <p className="text-copyright-text text-xs opacity-50 hover:opacity-100">
            <a
              href="https://github.com/naviadev"
              target="_blank"
              rel="noopener noreferrer"
            >
              naviadev
            </a>
          </p>
          <p className="text-copyright-text text-xs opacity-50 hover:opacity-100">
            <a
              href="https://github.com/kimbreaker"
              target="_blank"
              rel="noopener noreferrer"
            >
              kimbreaker
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
