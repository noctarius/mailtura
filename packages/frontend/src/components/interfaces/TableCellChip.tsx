import clsx from "clsx";
import { TailwindBgColor } from "../../helpers/tailwind-bg-colors.ts";
import { TailwindTextColor } from "../../helpers/tailwind-text-colors.ts";
import { JSX } from "solid-js";

interface TableCellChipProps {
  value: string;
  bgColor: TailwindBgColor;
  textColor: TailwindTextColor;
  icon?: JSX.Element;
}

const TableCellChip = (props: TableCellChipProps) => {
  return (
    <span
      class={clsx(
        "inline-flex",
        "items-center",
        "space-x-1",
        "px-2",
        "py-1",
        "rounded-full",
        "text-xs font-medium",
        "mt-1",
        "mr-1",
        props.bgColor,
        props.textColor
      )}
    >
      {props.icon}
      <span class="capitalize">{props.value}</span>
    </span>
  );
};

export default TableCellChip;
