import { Loader } from "lucide-solid";

interface TableLoadingProps {
  title: string;
  text: string;
}

export function TableLoading(props: TableLoadingProps) {
  return (
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
      <div class="flex flex-col items-center justify-center space-y-4">
        <div class="relative">
          <Loader class="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-2">{props.title}</h3>
          <p class="text-gray-600">{props.text}</p>
        </div>
        {/* Loading skeleton */}
        <div class="w-full max-w-4xl mt-8 space-y-4">
          {[...Array(5)].map(() => (
            <div class="animate-pulse">
              <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div class="h-3 bg-gray-300 rounded w-1/3"></div>
                </div>
                <div class="flex space-x-2">
                  <div class="h-6 bg-gray-300 rounded-full w-16"></div>
                  <div class="h-6 bg-gray-300 rounded-full w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
