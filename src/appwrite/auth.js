import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService{
            client=new Client();
            account;
            constructor(){
                this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
               // console.log("Project ID:", conf.appwriteProjectId); 
                
                this.account=new Account(this.client)
                
            }

            async createAccount({email,password,name}){
              
                try {
                  const userAccount=  await this.account.create(ID.unique(),email,password,name)
                  if(userAccount){
                  return this.login({email,password})
                  }  
                  else{
                    return userAccount;

                  }
                } catch (error) {
                    throw error;
                    
                }
            }
             
            async login({email,password}){
                try {
                       return await this.account.createEmailPasswordSession(email, password);  //update

                } catch (error) {
                    throw error;
                }
            }

            async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }
            
            async logout(){
                try {
                    await this.account.deleteSessions();
                    
                } catch (error) {
                    console.log("appwrite service::logut::error ",error);
                    
                }
            }


};                              
const authService=new AuthService();                     //object

export default authService



