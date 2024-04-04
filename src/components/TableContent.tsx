import {
  Alert,
  type AlertProps,
  Button,
  TableCell,
  TableRow,
  Skeleton,
  Stack,
  TableBody,
} from "@mui/material";
import { TagResponse } from "../utils";

type Props = {
  error: Error;
  data?: TagResponse;
  resetState: () => void;
  isLoading: boolean;
  rows: number;
};

export default function TableContent({
  error,
  data,
  resetState,
  isLoading,
  rows,
}: Props) {
  if (isLoading) {
    return (
      <WideCell>
        <Stack spacing={0.5}>
          {[...Array(rows)].map((e, i) => (
            <Skeleton variant="rounded" height={50} key={i}/>
          ))}
        </Stack>
      </WideCell>
    );
  }

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

  return (
    <TableBody>
      {data.items.map((tag) => (
        <TableRow hover key={tag.name}>
          <TableCell component="th" id={tag.name} scope="row" padding="none">
            {tag.name}
          </TableCell>
          <TableCell align="left">{tag.count}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function TableAlert(props: AlertProps) {
  return (
    <WideCell>
      <Alert {...props} sx={{ padding: 2 }} />
    </WideCell>
  );
}

function WideCell({ children }: { children: React.ReactNode }) {
  return (
    <TableBody>
      <TableRow sx={{ height: "100%"}}>
        <TableCell colSpan={2} padding="none" sx={{minWidth: "200px"}}>
          {children}
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
