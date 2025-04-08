const mongoose=require("mongoose");

const menProductsSchema=new mongoose.Schema({
    category:{
        type:String,    
    },
    subCategory: [
        {
            subCategoryName: {
                type: String,
            },
            products: [
                {
                    productName: { type: String, },
                    price: { type: String,  },
                    description: { type: String },
                    color: { type: String },
                    sizeStock:[{
                        size:{
                            type:String
                        },
                        stock:{
                            type:String
                            }
                    }],
                    image:[{
                        public_id:{
                            type:String
                        },
                        secure_url:{
                            type:String
                        }
                    }]
                }
            ]
        }
    ]
})


const menProdcts=mongoose.model("Mens",menProductsSchema);

module.exports=menProdcts