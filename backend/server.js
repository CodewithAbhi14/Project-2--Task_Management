const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res)=>{
    res.send("Welcome the to backend of Task Management Application..!!!")
})

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO)
.then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running at port: ${port}`)
        console.log('Connected to DB')
})
}).catch(err => console.log('Problem connecting DB', err))

