const express = require("express");
const cors = require("cors");
const markdownRoutes = require("./routes/markdownRoutes");

const app = express();
app.use(cors());

app.use("/markdown", markdownRoutes);

const POST = process.env.PORT || 5002;
app.listen(POST, () => console.log(`Server running on port ${POST}`));