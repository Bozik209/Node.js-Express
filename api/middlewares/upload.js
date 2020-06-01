const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()} - ${file.originalname}`);
    } 
})

// Filter type of image
// cb = callback 
const fileFilter = (req,file,cb) =>{  
    if (file.minetype !== 'image/jepg' || file.minetype !== 'image/png' ) {
        cb(null,true);
    }
    cb(null,false);
}

const upload = multer({
    // dest: 'uploads/',
    storage,
    limits:{
        fileSize: 1024 * 1024 * 2 // 2MB image
    },
    fileFilter
});

module.exports = upload;