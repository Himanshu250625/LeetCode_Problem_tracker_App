import React, { useState, useEffect } from "react";
import './QuestionList.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Link,
  Typography,
  LinearProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Box,
  TablePagination,
} from "@mui/material";
 
import NoteIcon from "@mui/icons-material/Note";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import questionsData from "../question";
  
const QuestionList = ({ darkMode }) => {
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem("questions");
    return savedQuestions ? JSON.parse(savedQuestions) : questionsData;
  });
  const [progress, setProgress] = useState(0);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkedCount = questions.filter((q) => q.checked).length;
    const totalCount = questions.length;
    setProgress((checkedCount / totalCount) * 100);
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleToggle = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, checked: !question.checked }
          : question
      )
    );
  };

  const handleRevisionToggle = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, revision: !question.revision }
          : question
      )
    );
  };

  const handleOpenNoteDialog = (id, note) => {
    setCurrentNoteId(id);
    setCurrentNote(note);
    setOpenNoteDialog(true);
  };

  const handleCloseNoteDialog = () => {
    setOpenNoteDialog(false);
  };

  const handleSaveNote = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === currentNoteId
          ? { ...question, note: currentNote }
          : question
      )
    );
    setOpenNoteDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0);
  };

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const solvedCount = questions.filter((q) => q.checked).length;
  const totalCount = questions.length;

  return (
    <>
      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            animation: "marquee 10s linear infinite",
            background:
              "linear-gradient(90deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 100%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          MOST LIKED QUESTION ON LEETCODE 
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ margin: 2 }}>
        Progress: {progress.toFixed(2)}%
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ margin: 2, height: 10, borderRadius: 5 }}
      />
      <Typography variant="h6" sx={{ margin: 2 }}>
        Questions Solved: {solvedCount} / {totalCount}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(solvedCount / totalCount) * 100}
        sx={{ margin: 2, height: 10, borderRadius: 5 }}
      />
      <Box sx={{ display: "flex", alignItems: "center", margin: 2 }}>
        <TextField
          variant="outlined"
          label="Search Question"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginRight: 2, flexGrow: 1, }}
        />
        <IconButton color="primary" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Problem</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Revision</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((question) => (
                <TableRow
                  key={question.id}
                  sx={{
                    backgroundColor:
                      question.id % 2 === 0 ? "lightgrey" : "white",
                  }}
                >
                  <TableCell>
                    <Checkbox
                      checked={question.checked}
                      onChange={() => handleToggle(question.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={question.url} target="_blank" rel="noopener">
                      {question.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handleOpenNoteDialog(question.id, question.note)
                      }
                    >
                      <NoteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRevisionToggle(question.id)}
                    >
                      {question.revision ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[20, 30, 50]}
          component="div"
          count={filteredQuestions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={openNoteDialog} onClose={handleCloseNoteDialog}>
        <DialogTitle>Note</DialogTitle>
        <DialogContent>
          <DialogContentText>Add your notes here:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Note"
            fullWidth
            multiline
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoteDialog}>Cancel</Button>
          <Button onClick={handleSaveNote}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionList;
