const Student = require("../models/student");
const ScanLog = require("../models/scanLog");
const Visitor = require("../models/visitor");
const CabDriver = require("../models/cabdriver");

exports.scanQRCode = async (req, res) => {
  const { qrData } = req.body;

  // Extract the student ID from the QR data
  const [type, Id] = qrData.split(":");
  // Validate the QR data format
  if ((type !== "student" && type !== "visitor" && type !== "cabdriver" ) || !Id ) {
    return res.status(400).json({ message: "Invalid QR code format" });
  }

  try {
    let find; // Define the variable outside the conditional blocks

    // Search for the student or visitor using the QR code data
    if (type === "student") {
      find = await Student.findById(Id);
      if (!find) {
        return res.status(404).json({ message: "Student not found" });
      }
    }
    else if(type === "cabdriver"){
      find = await CabDriver.findById(Id);
      if (!find) {
        return res.status(404).json({ message: "Cabdriver not found" });
      }
    }
    else {
      find = await Visitor.findById(Id);
      if (!find) {
        return res.status(404).json({ message: "Visitor not found" });
      }
    }

    // Log the scan
    const scanLog = new ScanLog({
      userName: find.name,
      rollNumber: find.rollNo,
      typeof: type,
      scanTime: new Date(),
    });
    await scanLog.save();

    // Respond with the student or visitor information
    res.status(200).json({
      typeof: scanLog.typeof,
      name: scanLog.userName,
      rollNo: scanLog.rollNumber,
    });
  } catch (error) {
    console.error("Error scanning QR code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User credentials
const GUARD_USERNAME = process.env.GUARD_NAME;
const GUARD_PASSWORD = process.env.GUARD_PASSWORD;

exports.loginGuard = (req, res) => {
  const { username, password } = req.body;
  if (username === GUARD_USERNAME && password === GUARD_PASSWORD) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};

exports.studentData = async (req, res) => {
  try {
    const scanLogs = await ScanLog.find().sort({ scanTime: -1 });
    res.json(scanLogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
