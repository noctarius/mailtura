import React from "react";
import clsx from "clsx";
import { TailwindBgColor } from "../../helpers/tailwind-bg-colors.ts";
import { TailwindTextColor } from "../../helpers/tailwind-text-colors.ts";

interface TableCellChipProps {
  value: string;
  bgColor: TailwindBgColor;
  textColor: TailwindTextColor;
  icon?: React.ReactNode;
}

const TableCellChip: React.FC<TableCellChipProps> = ({ value, bgColor, textColor, icon }) => {
  return (
    <span
      className={clsx(
        "inline-flex",
        "items-center",
        "space-x-1",
        "px-2",
        "py-1",
        "rounded-full",
        "text-xs font-medium",
        bgColor,
        textColor
      )}
    >
      {icon}
      <span className="capitalize">{value}</span>
    </span>
  );
};

export default TableCellChip;
