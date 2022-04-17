const express=require('express');
const router=express.Router();
const pizzas=require('./pizzas');
const uuid=require('uuid');

router.get('/',(req,res)=>res.json(pizzas));

router.get('/:id',(req,res)=>{
    const found=pizzas.some(pizza=>pizza.id===parseInt(req.params.id));
    if(found)
    {
        res.json(pizzas.filter(pizza=>pizza.id===parseInt(req.params.id)));
    }
    else{
        res.status(400).json({message:`pizza Not found with Id ${req.params.id}` });
    }
});

router.post('/',(req,res)=>{
    const newPizza=req.body;
    newPizza['id']=uuid.v4();         
       pizzas.push(req.body);
        res.json(pizzas);
  
});
router.put("/:id", (req, res) => {
  const found = pizzas.some((pizza) => pizza.id === req.params.id);
  if (found) {
    const updatepizza=req.body;

    pizzas.forEach(pizza=>{
        if(pizza.id===req.params.id){
         pizza.item=updatepizza.item?updatepizza.item:pizza.item;
         pizza.Type=updatepizza.Type?updatepizza.Type:pizza.Type;
         pizza.toppings=updatepizza.toppings?updatepizza.toppings:pizza.toppings;
         pizza.ingrediants=updatepizza.ingrediants?updatepizza.ingrediants:pizza.ingrediants;
         pizza.price=updatepizza.price?updatepizza.price:pizza.price;
         
        //  pizzas.push(pizza);
         res.json({ message: `Pizza details updated`,pizzas });
        }
        });

    // pizzas[req.params.id] = req.body;
  } else {
    res
      .status(400)
      .json({ message: `Pizza details Not found with Id ${req.params.id}` });
  }
});
router.delete('/:id',(req,res)=>{
    const found=pizzas.find(pizza=>pizza.id===req.params.id);
    console.log();
    if(found)
    {
        
        pizzas.splice(pizzas.indexOf(found),1);
       res.json({message:`pizza details deleted successfully`, pizzas });
    }
    else{
        res.status(400).json({message:`pizza details found with Id ${req.params.id}` });
    }
});

module.exports=router;