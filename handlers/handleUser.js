import User from '../models/user.js';

export function createUser(userId,name,email,photoURL,college,isAdvertiser){

    const newUser = new User({
        name: name,
        userId: userId,
        email: email,
        photoURL: photoURL,
        college: college,
        isAdvertiser: isAdvertiser
    });

    newUser.save()
        .then(user=> console.log("User saved:"))
        .catch(err=> console.log("Error while saving user",err));
}

export async function modifyUser(userId,updates){

    try{
        const updatedUser = await User.findOneAndUpdate({ userId: userId }, { $push: updates },{new:true})
        if(updatedUser){
            console.log("User updated ");
            return true;
        }
        else{
            console.log("No such user found");
            return false;
        }
    }
    catch(err){
        console.log("Error occured while modifying user",err)
    }
}

export async function deleteUser(userId){
    try{
        const result = await User.findOneAndDelete({ "userId" : userId })
        if(result){
            console.log("User deleted ")
            return true;
        }
        else{
            console.log("No such user found");
            return false;
        }
    }
    catch(err){
        console.log("Error occured while deleting user",err);
    }
    
}

export async function fetchUser(userId) {
    try{
        const result = await User.findOne({"userId": userId})
        if(result){
            console.log("User fetched")
            return result;
        }
        else{
            console.log("No such user found");
            return false;
        }
    }
    catch(err){
        console.log("Error occured while fetching user",err);
    }
}