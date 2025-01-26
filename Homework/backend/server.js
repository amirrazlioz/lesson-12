// 1. התקנת ספריות
// npm install express mongoose cors body-parser

import Express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"

const app = Express();

const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// connect to MongoDB
mongoose.connect("mongodb+srv://amirrazlioz:vOCjvLEg4EjtEHoY@amir1.xwum8.mongodb.net/amir-test" ) 

const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  age: Number,
  salary: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes
app.post('/employees', async (req, res) => {
  const { name, department, age, salary } = req.body;
  const newEmployee = new Employee({ name, department, age, salary });
  await newEmployee.save();
  console.log(`new Employee`);
  res.status(201).send('Employee added');
});

app.delete('/employees/:age', async (req, res) => {
  const age = parseInt(req.params.age);
  await Employee.deleteMany({ age: { $gt: age } });
  console.log(`Employees deleted`);
  res.send('Employees deleted');
});

app.put('/employees/department', async (req, res) => {
  const { oldDepartment, newDepartment } = req.body;
  await Employee.updateMany({ department: oldDepartment }, { department: newDepartment });
  console.log(`Department updated`);
  res.send('Department updated');
});


app.listen(port, () => {
  console.log(`Server running on port :${port}`);
});
