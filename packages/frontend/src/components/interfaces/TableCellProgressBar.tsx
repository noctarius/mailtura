import React from "react";
import clsx from "clsx";
import { TailwindBgColor } from "../../helpers/tailwind-bg-colors.ts";

interface TableCellProgressBarProps {
  value: number;
  color: TailwindBgColor;
}

const TableCellProgressBar: React.FC<TableCellProgressBarProps> = ({ value, color }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-16 bg-gray-200 rounded-full h-2">
        <div
          className={clsx(color, "h-2", "rounded-full")}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="text-sm text-gray-900">{value}%</span>
    </div>
  );
};

export default TableCellProgressBar;
