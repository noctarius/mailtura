interface CsvPreviewProps {
  headers: () => string[];
  rows: () => string[][];
}

export function CsvPreview(props: CsvPreviewProps) {
  return (
    <div class="border border-gray-200 rounded-lg overflow-hidden">
      <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h4 class="font-medium text-gray-900">CSV Preview</h4>
      </div>
      <div class="overflow-x-auto w-full">
        <table class="w-full text-sm">
          <thead class="bg-gray-100">
            <tr>
              {props.headers().map((header, index) => (
                <th
                  id={`header-${index}`}
                  class="px-3 py-2 text-left font-medium text-gray-900 whitespace-nowrap"
                >
                  Column {index + 1}
                  {header && <div class="text-xs text-gray-600 font-normal">{header}</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {props
              .rows()
              .slice(0, 3)
              .map((row, rowIndex) => (
                <tr id={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      id={`column-${cellIndex}`}
                      class="px-3 py-1 text-gray-900 overflow-clip-ellipsis"
                    >
                      {cell || <span class="text-gray-400">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
