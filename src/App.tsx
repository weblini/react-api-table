import Box from "@mui/material/Box";
import DataTable from "./components/DataTable";
import { Container, Typography } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function App() {
  return (
    <Box width="100vw">
      <Container>
        <Box
          maxWidth="800px"
          margin="auto"
          display="flex"
          flexDirection="column"
          height="100vh"
        >
          <Typography
            variant="h5"
            component="h1"
            padding="2rem 0"
            textAlign="center"
            flexShrink={0}
          >
            View tags on StackExchange
          </Typography>
          <DataTable />
        </Box>
      </Container>
    </Box>
  );
}
