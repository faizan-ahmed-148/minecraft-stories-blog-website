import { getBaseUrl } from "@/config";
import { messaging } from "@/firebaseinit";
import axios from "axios";
import { getToken } from "firebase/messaging";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
const api_url = getBaseUrl()
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
      authorization: {
        params: {
          redirect_uri: 'https://minecraftstories.gg/api/auth/callback/google',
        },
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 90 * 24 * 60 * 60, // 90 day
    cookie: {
      secure: process.env.NODE_ENV === "production", // set cookies to secure (HTTPS only) in production
    },
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,

  callbacks: {
    async signIn(user) {
      console.log(user, "user");
      if (user?.account?.provider === "google") {
        const formData = new FormData();
        formData.append("accessToken", user?.account?.access_token);
        const response = await axios.post(`${api_url}/client/g-login`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(response?.data){
          // toast.success("Login Successfull")
            console.log(response?.data, "Google Login Response");
  
            // Set cookie (available on client and server)
          
            await cookies().set({
              name: "user_info",
              value: JSON.stringify(response?.data),
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              path: "/",
              maxAge: 60 * 60 * 24 * 90, // 90 days
            });
          
  
            return true;
        }
      } else {
        return false;
      }
      
    },
    async redirect({ url, baseUrl }) {
      const dynamicBaseUrl = process.env.NEXTAUTH_URL || baseUrl;
      console.log("Dynamic Base URL:", dynamicBaseUrl); // Logs the appropriate URL
      return dynamicBaseUrl;
    }
    
  },

  pages: {
    signIn: "https://minecraftstories.gg/auth/login", // Custom sign-in page (make sure this route exists)
    error: "https://minecraftstories.gg/error", // Custom error page (optional)
    // You can add other pages like `verifyRequest`, `newAccount`, etc.
  },

  theme: {
    colorScheme: "light", // Customize the color scheme of the auth UI
  },
};
export default NextAuth(authOptions);
