import { Query } from "node-appwrite";
import { createAdminClient } from "./appwrite"
import { appwriteConfig } from "./appwrite/config";

export const getOfficers = async() => {
    try{
        const {databases} = await createAdminClient();
        const result = await databases.listDocuments(appwriteConfig.databaseId,
            appwriteConfig.officersId,
            []
        )
        return result.documents;
    }catch(error){
        console.log("Error fetching officers: ", error);
        throw error;        
    }
}