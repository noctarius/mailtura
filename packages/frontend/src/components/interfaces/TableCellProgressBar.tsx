import clsx from "clsx";
import { TailwindBgColor } from "../../helpers/tailwind-bg-colors.ts";

interface TableCellProgressBarProps {
  value: number;
  color: TailwindBgColor;
}

const TableCellProgressBar = (props: TableCellProgressBarProps) => {
  return (
    <div class="flex items-center space-x-2">
      <div class="w-16 bg-gray-200 rounded-full h-2">
        <div
          class={clsx(props.color, "h-2", "rounded-full")}
          style={{ width: `${props.value}%` }}
        ></div>
      </div>
      <span class="text-sm text-gray-900">{props.value}%</span>
    </div>
  );
};

export default TableCellProgressBar;
