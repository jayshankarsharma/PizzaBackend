const express=require('express');
const router=express.Router();
const carts=require('./cart');
const uuid=require('uuid');

router.get('/',(req,res)=>res.json(carts));

router.get('/:id',(req,res)=>{
    const found=carts.some(cart=>cart.id===req.params.id);
    if(found)
    {
        res.json(carts.filter(cart=>cart.id===req.params.id));
    }
    else{
        res.status(400).json({message:`cart Not found with Id ${req.params.id}` });
    }
});

router.post('/',(req,res)=>{
    const newcart=req.body;    
    newcart['id']=uuid.v4();    
       carts.push(req.body);
        res.json(carts);
  
});
router.put("/:id", (req, res) => {
  const found = carts.some((cart) => cart.id === req.params.id);
  if (found) {
    const updatecart=req.body;

    carts.forEach(cart=>{
        if(cart.id===req.params.id){
         cart.itemIds=updatecart.itemIds?updatecart.itemIds:cart.itemIds;
         cart.totalPrice=updatecart.totalPrice?updatecart.totalPrice:cart.totalPrice;
         cart.orderPaced=updatecart.orderPaced?updatecart.orderPaced:cart.orderPaced;
         
        //  carts.push(cart);
         res.json({ message: `cart details updated`,carts });
        }
        });

    // carts[req.params.id] = req.body;
  } else {
    res
      .status(400)
      .json({ message: `cart details Not found with Id ${req.params.id}` });
  }
});
router.delete('/:id',(req,res)=>{
    const found=carts.some(cart=>cart.id===req.params.id);
    if(found)
    {
        for(i=0;i<carts.length;i++)
        if(carts[i].id===req.params.id)
        carts.splice(i,1);
       res.json({message:`cart details deleted successfully`, carts });
    }
    else{
        res.status(400).json({message:`cart details found with Id ${req.params.id}` });
    }
});

module.exports=router;