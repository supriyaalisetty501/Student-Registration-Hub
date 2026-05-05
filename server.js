const express = require("express");
const fs = require("fs");
const xlsx = require("xlsx");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const FILE = "students.xlsx";

// LOGIN API
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "1234") {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// STUDENT SAVE TO EXCEL
app.post("/student", (req, res) => {

    const student = req.body;

    let data = [];

    if (fs.existsSync(FILE)) {
        const wb = xlsx.readFile(FILE);
        const sheet = wb.SheetNames[0];
        data = xlsx.utils.sheet_to_json(wb.Sheets[sheet]);
    }

    data.push(student);

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Students");
    xlsx.writeFile(wb, FILE);

    res.json({ success: true });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});