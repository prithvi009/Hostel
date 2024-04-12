const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const complaintRoutes = require("./routes/complaintRoutes");
const studentRoutes = require("./routes/studentRoutes");
const wardenRoutes = require("./routes/wardenRoutes");
const workersRoutes = require("./routes/workersRoutes");
const userRoutes = require("./routes/userRoutes");
const { authorizeWarden, authorizeWorker, authorizeStudent } = require("./middleware/auth");

app.use(cors());
app.use(express.json());

app.use('/', complaintRoutes);
app.use('/', studentRoutes)
app.use('/', wardenRoutes)
app.use('/', workersRoutes)
app.use('/', userRoutes)

app.use('/students', authorizeStudent, studentRoutes); 
app.use('/wardens', authorizeWarden, wardenRoutes); 
app.use('/workers', authorizeWorker, workersRoutes); 


app.listen(3000, () => {
  db.initDatabase().then(() => {
    console.log("Database initialized");
  }).catch((err) => {
    console.log(err);
  });
  

  console.log("listening");
});
