import * as zod from "zod"

const validEmail = zod.string().email({ message: "Invalid email address" });
const validUserName = zod.string();
const validPassword = zod.string().min(8,{message:"length should be atleast 8 characters"})

interface userInfo{
    username:string,
    email:string,
    password:string
}

export const inputChecker = async ({username ,email,password}:userInfo) => {
    
    const u = await validUserName.safeParseAsync(username);
    const e = await validEmail.safeParseAsync(email);
    const p = await validPassword.safeParseAsync(password);
    
    if (u.success&&e.success&&p.success){
     return true;
    } else{
     return false;
    }
}