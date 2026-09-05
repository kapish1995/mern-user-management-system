require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");

const sampleUsers = [
  { name: "Aditi Sharma", email: "aditi.sharma@example.com", phone: "+91 98765 43210", role: "admin", status: "active" },
  { name: "Rohan Verma", email: "rohan.verma@example.com", phone: "+91 91234 56789", role: "member", status: "active" },
  { name: "Priya Nair", email: "priya.nair@example.com", phone: "+91 99887 76655", role: "member", status: "inactive" },
  { name: "Karan Mehta", email: "karan.mehta@example.com", phone: "+91 90000 11122", role: "viewer", status: "active" },
  { name: "Sneha Iyer", email: "sneha.iyer@example.com", phone: "+91 93456 78901", role: "member", status: "active" },
];

async function run() {
  await connectDB();
  await User.deleteMany({});
  await User.insertMany(sampleUsers);
  console.log(`Seeded ${sampleUsers.length} users`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
