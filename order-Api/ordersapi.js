const express=require('express');
const router=express.Router();
const orders=require('./order');
const uuid=require('uuid');

router.get('/',(req,res)=>res.json(orders));

router.get('/:id',(req,res)=>{
    const found=orders.some(cart=>cart.id===req.params.id);
    if(found)
    {
        res.json(orders.filter(cart=>cart.id===req.params.id));
    }
    else{
        res.status(400).json({message:`cart Not found with Id ${req.params.id}` });
    }
});

router.post('/',(req,res)=>{
    const newcart=req.body;    
    newcart['id']=uuid.v4();    
       orders.push(req.body);
        res.json(orders);
  
});
router.put("/:id", (req, res) => {
  const found = orders.some((cart) => cart.id === req.params.id);
  if (found) {
    const updatecart=req.body;

    orders.forEach(cart=>{
        if(cart.id===req.params.id){
         cart.cartId=updatecart.cartId?updatecart.cartId:cart.cartId;
         cart.orderPaced=updatecart.orderPaced?updatecart.orderPaced:cart.orderPaced;
         cart.deliverd=updatecart.deliverd?updatecart.deliverd:cart.deliverd;
         
        //  orders.push(cart);
         res.json({ message: `cart details updated`,orders });
        }
        });

    // orders[req.params.id] = req.body;
  } else {
    res
      .status(400)
      .json({ message: `cart details Not found with Id ${req.params.id}` });
  }
});
router.delete('/:id',(req,res)=>{
    const found=orders.some(cart=>cart.id===req.params.id);
    if(found)
    {
        for(i=0;i<orders.length;i++)
        if(orders[i].id===req.params.id)
        orders.splice(i,1);
       res.json({message:`cart details deleted successfully`, orders });
    }
    else{
        res.status(400).json({message:`cart details found with Id ${req.params.id}` });
    }
});

module.exports=router;