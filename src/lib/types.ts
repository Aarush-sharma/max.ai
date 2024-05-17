import * as zod from "zod"

export const validEmail = zod.string().email({ message: "Invalid email address" });
const validUserName = zod.string();
export const validPassword = zod.string().min(8,{message:"length should be atleast 8 characters"})

interface userInfo{
    username?:string,
    email:string,
    password?:string,
    updatedPassword?:string
}

export const inputChecker = async ({username ,email,password,updatedPassword}:userInfo) => {
    
    const u = await validUserName.safeParseAsync(username);
    const e = await validEmail.safeParseAsync(email);
    const p = await validPassword.safeParseAsync(password);
    const s = await validPassword.safeParseAsync(updatedPassword)
    
    if (u.success&&e.success&&p.success||s.success&&e.success||e.success){
     return true;
    } else{
     return false;
    }
}