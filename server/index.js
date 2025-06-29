require('dotenv').config();
const express=require('express')
const mongoose=require('mongoose')
const app=express()
const PORT = process.env.PORT || 3002;
const cors =require('cors')
const bodyParser=require('body-parser')
const DB_URL=process.env.MONGODB_URL;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
// app.use('/uploads', express.static('uploads'));



// root route
app.get('/',(req,res)=>{
    res.send("home route")
})

// admin signup/ login 
const adminAuthRoutes = require('./routes/adminAuth');
app.use('/api/admin', adminAuthRoutes);

// admin dashboard access
const adminDashboardRoutes=require('./routes/adminDashboard')
 app.use('/api/admin', adminDashboardRoutes);

// Add books by admin 
const addBookRoute =require( './routes/addBook.js');
app.use('/api/books', addBookRoute);


// get all books from database
const getAllBooksRoute=require('./routes/getAllBooks.js')
app.use('/api/books', getAllBooksRoute);

// student registration
const studentRoutes = require('./routes/studentRegistration.js');
app.use('/api/students', studentRoutes);

// get available book
const availableBooks=require('./routes/book.js')
app.use('/api/books',availableBooks)

// issue book to student
const issueBook=require('./routes/issueBook.js')
app.use('/api/issue',issueBook)

// return book by student
const returnBook=require('./routes/returnBook.js')
app.use('/api/return',returnBook)

// fine calculation
const fineCalculate=require('./routes/fine.js')
app.use('/api/fines',fineCalculate)

// admin profile
const adminProfile=require('./routes/adminProfile.js')
app.use('/api/admin',adminProfile)


// forget password

const forgetPassword=require('./routes/forgetPassword.js')

app.use('/api',forgetPassword)

app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
    mongoose.connect(DB_URL).then(()=>{
        console.log(`Database connected successfully!`)
    }).catch((er)=>{
        console.log(`some error occured to connecting databse ${er}`)
    })
    
})