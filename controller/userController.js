const jwt = require('jsonwebtoken');
const JWT_KEY = 'hgh6767hhghg8989';
const userModel = require('../models/userModel');

module.exports.getUser = async function getUser(req, res) {
    let id = req.id;   // req.id se hume user ki id mil jati h jo logged in h
    console.log("hi");
    console.log(id);
    let user = await userModel.findById(id);
    if (user) {
        return res.json(user);
    }
    else {
        res.json({
            message: "user not found"
        })
    }
}

module.exports.updateUser = async function updateUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);

        let dataToBeUpdated = req.body;
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }

            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message: "data updated successfully",
                data: user
            })
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }

}

module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        // let id = req.params.id;
        let id=req.uid;
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.json({
                message: "user not found"
            })
        }
        res.json({
            message: "data deleted successfully"
        })
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.getAllUser = async function getAllUser(req, res) {
    try {
        let users = await userModel.find();
        if (users) {
            res.json({
                message: "users retrieved successfully",
                data: users
            })
        }
        else {
            res.json({
                message: "users not found"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

// module.exports.protectRoute=function protectRoute(req,res,next){
//     if(req.cookies.isLoggedIn){     // It gives the information of login status.
//         let isVerified=jwt.verify(req.cookies.isLoggedIn,JWT_KEY);   // yeh purane wale ka header aur payload ko le lega aur naya signature banayega agar purana signature naya signature se match kar rha h to login h otherwise nhi h.
//         if(isVerified){
//             next();
//         }
//         else{
//             return res.json({
//                 message:"user not verified"
//             })
//         }
//     }
//     else{
//         return res.json({
//             message:"user not logged in"
//         })
//     }
// }

module.exports.updateProfileImage = function updateProfileImage(req, res) {
    res.json({
        message: "file uploaded successfully"
    })
}