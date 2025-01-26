const baseURL = 'http://localhost:3000';

async function addEmployee() {
  const name = document.getElementById('name').value;
  const department = document.getElementById('department').value;
  const age = document.getElementById('age').value;
  const salary = document.getElementById('salary').value;

  await axios.post(`${baseURL}/employees`, {
    name, department, age, salary
  });
  alert('Employee added');
}

async function deleteEmployeesByAge() {
  const age = document.getElementById('deleteAge').value;
  await axios.delete(`${baseURL}/employees/${age}`);
  alert('Employees deleted');
}

async function updateDepartment() {
  const oldDepartment = document.getElementById('oldDepartment').value;
  const newDepartment = document.getElementById('newDepartment').value;

  await axios.put(`${baseURL}/employees/department`, {
    oldDepartment, newDepartment
  });
  alert('Department updated');
}
