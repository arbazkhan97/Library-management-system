const express = require('express');
const Book = require('../models/Books');  
const router = express.Router();
const upload = require('../middleware/fileUpload');

// Route to fetch only available books
router.get('/getAllBooks', async (req, res) => {
  try {
    
     const getAllBooks = await Book.find({ quantity: { $gt: 0 } });
    res.status(200).json(getAllBooks,{message:"get all books from DB successfully!"}); 
  } catch (error) {
    console.error('Error fetching available books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});



// show route 
router.get('/getAllBooks/:id', async (req, res) => {
  try {
    let id=req.params.id
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Update book by ID
router.put("/getAllBooks/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedFields = {
      title: req.body.title || existingBook.title,
      author: req.body.author || existingBook.author,
      category: req.body.category || existingBook.category,
      isbn: req.body.isbn || existingBook.isbn,
      quantity: req.body.quantity || existingBook.quantity,
      available: req.body.available || existingBook.available,
    };

    // Upload image to Cloudinary if new one provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedFields.image = result.secure_url;
    } else {
      updatedFields.image = existingBook.image;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({ message: "Book updated successfully!", updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Server error" });
  }
});





// delete books routes

router.delete('/getAllBooks/:id',async(req,res)=>{

  let id=req.params.id
  try{

    const delBook=await Book.findByIdAndDelete(id)

    res.status(200).json(delBook,{message:"book deleted successfully!"})

  }catch(err){
 
    console.log("error", err)
    res.status(500).json({message:"Books not delete during some errors"})
  }
})


module.exports = router;