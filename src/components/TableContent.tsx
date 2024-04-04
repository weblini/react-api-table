import { Alert, type AlertProps, Button, TableCell, TableRow } from "@mui/material";
import { TagResponse } from "../utils";

type Props = {
  error: Error;
  data?: TagResponse;
  resetState: () => void;
};

export default function TableContent({ error, data, resetState }: Props) {
  if (error)
    return (
      <TableAlert
        severity="error"
        action={
          error.name === "bad_parameter" ? (
            <Button color="inherit" size="small" onClick={resetState}>
              Try again
            </Button>
          ) : null
        }
      >
        {error.name === "throttle_violation"
          ? "You have exhausted the request limit. Try again later."
          : "An error occurred while fetching tag data."}
      </TableAlert>
    );

  if (!data?.items?.length)
    return <TableAlert severity="info">No tags.</TableAlert>;

  return data.items.map((tag) => (
    <TableRow hover key={tag.name}>
      <TableCell component="th" id={tag.name} scope="row" padding="none">
        {tag.name}
      </TableCell>
      <TableCell align="left">{tag.count}</TableCell>
    </TableRow>
  ));
}

function TableAlert(props: AlertProps) {
  return (
    <TableRow sx={{ height: "100%" }}>
      <TableCell colSpan={2}>
        <Alert {...props} sx={{ padding: 2 }} />
      </TableCell>
    </TableRow>
  );
}
