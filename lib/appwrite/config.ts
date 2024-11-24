export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    officersId: process.env.NEXT_PUBLIC_APPWRITE_OFFICERS_COLLECTION!,
    bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
    secretKey: process.env.NEXT_APPWRITE_KEY!,
  };
   