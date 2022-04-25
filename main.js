const express=require('express');
const logger=require('./middleware/logger');
const path=require('path');
const app=express();
const mongoose=require('./mongodb.js');
const cors=require('cors');
app.use(cors());


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));


app.use(logger);

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
// app.get('/',(req,res)=>{
//     // res.send('<h1>Hello world</h1>')
//     res.sendFile(path.join(__dirname,'public','index.html'))
// });

app.use('/api/users', require('./users-api/usersapi'));
// app.use('/api/pizzas', require('./pizza-Api/Pizzasapi'));
// app.use('/api/carts', require('./cart-Api/cartsapi'));
// app.use('/api/orders', require('./order-Api/ordersapi'));
