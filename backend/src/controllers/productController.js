const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;

exports.createProduct = async (req, res) => {
    try{
        const {title, description, price, category, stock} = req.body;
        
        if(!req.files || !req.files.imageUrl){
            return res.status(400).json({
                success:false,
                message:"Please upload an image"
            });
        }

        const file = req.files.imageUrl;

        if(!title || !description || !price || !category || !stock){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "product"
        });

        if(!uploadImage){
            return res.status(400).json({
                success:false,
                message:"Failed to upload image"
            });
        }

        // Create product
        const product = await Product.create({
            title,
            description,
            price,
            category,
            stock,
            imageUrl: uploadImage.secure_url,
            publicId: uploadImage.public_id
        });

        res.status(201).json({
            success:true,
            message:"Product created successfully",
            product
        });
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        
        if(!products){
            return res.status(400).json({
                success:false,
                message:"Products not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"Products fetched successfully",
            products
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.getProductById = async (req, res) => {
    try{
        const {productId} = req.params;
        const product = await Product.findById(productId);

        if(!product){
            return res.status(400).json({
                success:false,
                message:"Product not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"Product fetched successfully",
            product
        });
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try{
        const {productId} = req.params;
        const product = await Product.findByIdAndUpdate(productId,{...req.body}, {new:true, runValidators:true});
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        if(req.files && req.files.imageUrl){
            const file = req.files.imageUrl;
            const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder:"product"
            });
            if(!uploadImage){
                return res.status(400).json({
                    success:false,
                    message:"Failed to upload image"
                });
            }

            // Delete old image from Cloudinary
            if (product.publicId) {
                await cloudinary.uploader.destroy(product.publicId);
            }

            product.imageUrl = uploadImage.secure_url;
            product.publicId = uploadImage.public_id;
            await product.save();
        }

        return res.status(200).json({
            success:true,
            message:"Product updated successfully",
            product
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try{
        const {productId} = req.params;
        const product = await Product.findByIdAndDelete(productId);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        // Delete image from Cloudinary
        if (product.publicId) {
            await cloudinary.uploader.destroy(product.publicId);
        }

        return res.status(200).json({
            success:true,
            message:"Product deleted successfully",
            product
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};