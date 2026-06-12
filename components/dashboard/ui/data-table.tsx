import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  cell: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No records yet.",
  className,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={cn("dashboard-card", className)}>
        <p className="py-12 text-center text-sm text-text-tertiary">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("dashboard-card w-full overflow-x-auto", className)}>
      <table className="w-full min-w-[480px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border-subtle">
            {columns.map((col, i) => (
              <th
                key={col.key}
                className={cn(
                  "py-3 text-[11px] font-medium tracking-[0.06em] text-text-tertiary uppercase",
                  i === 0 ? "pl-5 pr-3" : "px-3",
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className="border-b border-border-subtle transition-colors last:border-0 hover:bg-surface-subtle"
            >
              {columns.map((col, i) => (
                <td
                  key={col.key}
                  className={cn(
                    "py-3 text-[13px] text-text-primary",
                    i === 0 ? "pl-5 pr-3" : "px-3",
                    col.className,
                  )}
                >
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
