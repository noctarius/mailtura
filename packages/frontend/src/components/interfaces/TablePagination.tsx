import { PaginationMetadata } from "@mailtura/rpcmodel/pagination/index.js";

interface TablePaginationProps {
  pagination: () => PaginationMetadata | undefined;
  onPageChange: (cursor: string | undefined) => void;
}

export function TablePagination(props: TablePaginationProps) {
  const visible = () => props.pagination() !== undefined;
  const firstCursor = () => props.pagination()?.firstCursor;
  const lastCursor = () => props.pagination()?.lastCursor;
  const previousCursor = () => props.pagination()?.previousCursor;
  const nextCursor = () => props.pagination()?.nextCursor;

  const currentPage = () => props.pagination()?.currentPage ?? 1;
  const totalPages = () => props.pagination()?.pages ?? 1;

  const firstButtonEnabled = () => firstCursor() !== undefined && currentPage() > 1;
  const lastButtonEnabled = () => lastCursor() !== undefined && currentPage() < totalPages();
  const previousButtonEnabled = () => previousCursor() !== undefined;
  const nextButtonEnabled = () => nextCursor() !== undefined;

  return visible() ? (
    <div class="flex items-center mt-3 space-x-3 justify-end w-full">
      <button
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:border-gray-200 disabled:border transition-colors flex items-center space-x-2"
        onClick={() => props.onPageChange(undefined)}
        disabled={!firstButtonEnabled()}
      >
        &lt;&lt;
      </button>
      <button
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:border-gray-200 disabled:border transition-colors flex items-center space-x-2"
        onClick={() => props.onPageChange(previousCursor())}
        disabled={!previousButtonEnabled()}
      >
        &lt;
      </button>
      <span>Page {props.pagination()?.currentPage ?? 1}</span>
      <button
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:border-gray-200 disabled:border transition-colors flex items-center space-x-2"
        onClick={() => props.onPageChange(nextCursor())}
        disabled={!nextButtonEnabled()}
      >
        &gt;
      </button>
      <button
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:border-gray-200 disabled:border transition-colors flex items-center space-x-2"
        onClick={() => props.onPageChange(lastCursor())}
        disabled={!lastButtonEnabled()}
      >
        &gt;&gt;
      </button>
    </div>
  ) : null;
}
