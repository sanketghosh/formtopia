import { fetchSingleFormAction } from "@/actions/form.actions";
import { ElementsType, FormElementInstance, SubmissionType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDate } from "@/utils/format-date";
import { formatDistance } from "date-fns";

type ColumnType = {
  id: string;
  label: string;
  required: boolean;
  type: ElementsType;
};
type RowType = { [key: string]: string } & {
  submittedAt: Date;
};

export default function FormSubmissionsTable() {
  const { id } = useParams<{ id?: string }>();

  const { data, isError, error } = useQuery({
    queryFn: () => fetchSingleFormAction(id!),
    queryKey: ["single-form-data-submission-table", id],
    staleTime: 5000,
    refetchOnWindowFocus: true,
  });

  if (isError) {
    return (
      <h2 className="text-sm font-semibold text-destructive">
        {error.message}
      </h2>
    );
  }

  const formSubmissions = data?.data?.formSubmissions;
  // console.log(formSubmissions);
  if (!formSubmissions || formSubmissions.length === 0) {
    return <div>No submissions found</div>;
  }
  const formContent = data?.data?.content; // Assuming this contains form attributes

  if (!formSubmissions || formSubmissions.length === 0) {
    return <div>No submissions found</div>;
  }

  if (!formContent) {
    return <div>No form structure found</div>;
  }

  // Parse form attributes into columns
  const columns: ColumnType[] = JSON.parse(formContent).map(
    (element: FormElementInstance) => ({
      id: element.id,
      label: element.extraAttributes?.label || `Field ${element.id}`,
      required: element.extraAttributes?.required || false,
      type: element.type,
    }),
  );

  // Create rows for the submissions
  /*   const rows: RowType[] = formSubmissions.map((submission) => {
    const parsedContent = JSON.parse(submission.content);
    const row: RowType = { submissionId: submission.id }; // Include a unique row identifier

    columns.forEach((column) => {
      row[column.id] = parsedContent[column.id] || "N/A"; // Match submission content to form attributes
    });

    return row;
  }); */

  let rows: RowType[] = [];
  formSubmissions.forEach((submission: SubmissionType) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.submittedAt,
    });
  });

  // Debugging logs
  /*   console.log("Columns:", columns);
  console.log("Rows:", rows); */

  if (columns.length === 0) {
    return <div>No valid columns found in form structure</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Submissions</h2>
      <div className="rounded-md border p-2">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((item) => (
                <TableHead key={item.id} className="uppercase">
                  {item.label}
                </TableHead>
              ))}
              <TableHead className="uppercase">Submitted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell>{formatDate(row.submittedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: React.ReactNode = value;

  return <TableCell>{node}</TableCell>;
}
