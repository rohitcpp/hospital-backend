require('dotenv').config();
const connectDB = require('./src/config/db');  // import connection
//const Doctor = require('./src/models/Doctor');
//const Patient = require('./src/models/Patient');
const dept=require('./src/models/Department');
connectDB();
// Insert a doctor
/*const addDoctor = async () => {
    try {
        const doc = new Doctor({
            name: "Dr. Rohit Sharma",
            email: "rohit@hospital.com",
            phno: "9876543210",
            spec: "Heart Specialist",
            dept: "Cardiology",
            exp: "10 years",
            qual: "MBBS, MD",
            status: "Active"
        });
        await doc.save();
        console.log("Doctor saved:", doc);
    } catch (err) {
        console.error("Error saving doctor:", err.message);
    }
};*/

/*const addPatient = async () => {
    try {
        const doc = new Patient({
            fname: "Drashti Mangwuwala",
            email: "d@gmail.com",
            phno: "9876543210",
            age: "19",
            gender: "female",
            bg: 'A+',
            address: "dabholi surat",
            emerno: "8498944456",
            medical_history: "Healthy"
        });
        await doc.save();
        console.log("Patient saved:", doc);
    } catch (err) {
        console.error("Error saving Patient:", err.message);
    }
};*/
const adddept= async()=>
{
    try{
        const dept1=new dept({
            dept: 'Neurology'
        });
        await document.save();
        console.log("saved");
    }catch(err)
    {
        console.log("error: ", err.message);
    }
};

//addDoctor();
//addPatient();
adddept();
