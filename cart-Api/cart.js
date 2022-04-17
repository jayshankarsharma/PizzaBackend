const carts=[
    {
        id:"1",
        itemIds:[
            ['1'],[1] //2D array for pizza ID and quantity
        ],        
        totalPrice:80,  //total price
        orderPaced:false
    },
    {
        id:"2",
        itemIds:[
            ['1','3'],[1,2] //2D array for pizza ID and quantity
        ],
        totalPrice:480, //total price
        orderPaced:false
    }
];
module.exports= carts;