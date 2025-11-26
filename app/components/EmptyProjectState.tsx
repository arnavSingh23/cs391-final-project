"use client";

import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function EmptyProjectState({ onAdd }: { onAdd: () => void }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 2,
      }}
    >
      <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
        No Projects Yet
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Start building your project archive by adding your first project!
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        Add Your First Project
      </Button>
    </Box>
  );
}
