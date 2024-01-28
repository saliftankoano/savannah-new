import "./Tooltip.css";

import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CircleBackslashIcon } from "@radix-ui/react-icons";

export default function AddTlt(props) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="IconButton">
            <CircleBackslashIcon />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            Delete
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
