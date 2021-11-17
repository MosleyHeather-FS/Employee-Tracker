class Employee{
    constructor(id, name, age, annualSalary){
        this.id = id;
        this.name = name;
        this.age = age;
        this.annualSalary = annualSalary;
    }
}
class Main {
    constructor(){
        this.employees = [];

        let partTime1 = new PartTime(1,"Ally", 19, 7540, 7.25, 20);
        let partTime2 = new PartTime(2,"Ben", 24, 8320, 8, 20);
        let fullTime1 = new FullTime(3,"Edgar", 43, 41600, 20, 40);
        let fullTime2 = new FullTime(4,"Amy", 32, 31200, 15, 40);

        this.employees.push(partTime1);
        this.employees.push(partTime2);
        this.employees.push(fullTime1);
        this.employees.push(fullTime2);

        
        let mainMenu = ()=>{

        let selection = prompt("Main Menu \n\n 1. Add Employee \n 2. Remove Employee \n 3. Edit Employee \n 4. Display Employees \n\n Enter Selection:");
            if (selection == 1) {
              let newEmployee = prompt("Enter new employee's name, age, pay rate, and hours/wk. Separate each by a comma."); 
              let newEmployeeData = newEmployee.split(",");
              if (newEmployeeData[3] >= 40) {
                let newEmployeeID = 1;
                this.employees.forEach(employee => {
                    if (employee.id > newEmployeeID){
                        newEmployeeID = (employee.id + 1);
                    };
                });
                let newEmployeeFile = new FullTime(newEmployeeID,newEmployeeData[0],Number(newEmployeeData[1]),0,Number(newEmployeeData[2]));
                newEmployeeFile.calculatePay();
                this.employees.push(newEmployeeFile);
              } else {
                let newEmployeeID = 1;
                this.employees.forEach(employee => {
                    if (employee.id > newEmployeeID){
                        newEmployeeID = (employee.id + 1);
                    };
                });
                let newEmployeeFile = new PartTime(newEmployeeID,newEmployeeData[0],Number(newEmployeeData[1]),0,Number(newEmployeeData[2]),Number(newEmployeeData[3]));
                newEmployeeFile.calculatePay();
                this.employees.push(newEmployeeFile);
              };
              
              console.log(this.employees);
              mainMenu();
        
            }else if (selection == 2) {
              let removeEmployee = prompt("Enter the name of the employee being removed.");
              this.employees = this.employees.filter(e =>e.name !== removeEmployee);
              console.log(this.employees);
              mainMenu();
        
            }else if (selection == 3) {
                let editEmployee = prompt("Choose the employee by their ID number and then enter their new pay rate. Separate each by a comma."); 
                let editEmployeeData = editEmployee.split(",");

                this.employees.forEach(employee => {
                if (employee.id === (Number(editEmployeeData[0]))) {
                    employee.payRate = (Number(editEmployeeData[1]));
                    employee.calculatePay();
                };
                });
                console.log(this.employees);
                mainMenu();

            }else if (selection == 4) {
                console.table(this.employees,["id","name","annualSalary","payRate","hours","employeeType"]);
                mainMenu();
            }
        }
        mainMenu();
    } 
    
}
class PartTime extends Employee{
    constructor(id, name, age, annualSalary, payRate, hours){
        super(id, name, age, annualSalary);
        this.payRate = payRate;
        this.hours = hours;
        this.employeeType = "Part Time";
    }
    calculatePay(e){
        this.annualSalary = ((this.payRate*this.hours)*52);
    }
}
class FullTime extends Employee{
    constructor(id, name, age, annualSalary, payRate){
        super(id, name, age, annualSalary);
        this.payRate = payRate;
        this.employeeType = "Full Time";
    }
    calculatePay(e){
        this.annualSalary = ((this.payRate*40)*52);
    }
}

(()=>{
    const main = new Main();
})();