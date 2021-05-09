import bcrypt from 'bcryptjs'
const data={
    user:[
        {
            name:'arham',
            email:'admin@example.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin:true
        },
        {
            name:'asim',
            email:'user@example.com',
            password: bcrypt.hashSync('1234',8),
            isAdmin:false
        }
    ],
    products:[
        {
           
            name:'Nike Slim Shirt',
            category:'Shirts',
            image:'/images/p1.jpg',
            price:120,
            countInStock:10,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:"high quality product"
        },
        {
           
            name:'Adidas Fit Shirt',
            category:'Shirts',
            image:'/images/p2.jpg',
            price:100,
            countInStock:20,
            brand:'Adidas',
            rating:4,
            numReviews:10,
            description:"high quality product"
        },
        {
           
            name:'Lacoste Free Shirt',
            category:'Shirts',
            image:'/images/p3.jpg',
            price:200,
            countInStock:30,
            brand:'Lacoste',
            rating:4.8,
            numReviews:17,
            description:"high quality product"
        },
        {
           
            name:'Nike Slim Pant',
            category:'Pants',
            image:'/images/p4.jpg',
            price:78,
            countInStock:10,
            brand:'Nike',
            rating:4.5,
            numReviews:14,
            description:"high quality product"
        },
        {
          
            name:'Puma Slim Pant',
            category:'Pants',
            image:'/images/p5.jpg',
            price:65,
            countInStock:10,
            brand:'Nike',
            rating:4.5,
            numReviews:10,
            description:"high quality product"
        },
        {
           
            name:'Adidas Fit Pant',
            category:'Pants',
            image:'/images/p6.jpg',
            price:139,
            countInStock:0,
            brand:'Adidas',
            rating:2,
            numReviews:15,
            description:"high quality product"
        },
    ]
}
export default data;