import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";

interface Todo {
  id: number;
  subject: string;
  notes: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [viewing, setViewing] = useState<Todo | null>(null);

  const handleOpen = (todo?: Todo) => {
    setEditing(todo || null);
    setSubject(todo?.subject || "");
    setNotes(todo?.notes || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setSubject("");
    setNotes("");
  };

  const handleSave = () => {
    if (subject.trim() === "") return;
    if (editing) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === editing.id ? { ...t, subject, notes } : t
        )
      );
    } else {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), subject, notes },
      ]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f7f9fb" }}>
      <AppBar position="static" sx={{ bgcolor: "#3f51b5" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
            My To-Do List
          </Typography>
          <Button
            color="inherit"
            startIcon={<Add />}
            onClick={() => handleOpen()}
            sx={{
              bgcolor: "#fff",
              color: "#3f51b5",
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 1,
              "&:hover": { bgcolor: "#e3e6f3" },
            }}
          >
            Add New
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          {todos.length === 0 && (
            <Grid item xs={12}>
              <Typography
                align="center"
                color="text.secondary"
                sx={{ mt: 8, fontSize: 22 }}
              >
                No to-dos yet. Click "Add New" to get started.
              </Typography>
            </Grid>
          )}
          {todos.map((todo) => (
            <Grid item xs={12} sm={6} md={4} key={todo.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  bgcolor: "#fff",
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#3f51b5" }}
                  >
                    {todo.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {todo.notes.length > 60
                      ? todo.notes.slice(0, 60) + "..."
                      : todo.notes}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="view"
                    onClick={() => setViewing(todo)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleOpen(todo)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editing ? "Edit To-Do" : "Add New To-Do"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject"
            fullWidth
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Notes"
            fullWidth
            multiline
            minRows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ bgcolor: "#3f51b5" }}
          >
            {editing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* View Dialog */}
      <Dialog open={!!viewing} onClose={() => setViewing(null)}>
        <DialogTitle>To-Do Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {viewing?.subject}
          </Typography>
          <Typography variant="body1">{viewing?.notes}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewing(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default App;