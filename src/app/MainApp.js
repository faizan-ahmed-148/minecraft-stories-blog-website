import { getBaseUrl } from "@/config";
import Nexttitle from "./Components/meta/Nexttitle";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Loading from "./Components/Helper/Loading";
const Tracker = dynamic(() => import("./Components/meta/Tracker"), {
  loading: () => <Loading />,
});

export default async function MainApp({ children }) {
  const cookieStore =  await cookies()
  const userData = cookieStore.get('user_info')?.value || null;
  try {
    const baseUrl = getBaseUrl();
    
    const response = await fetch(`${baseUrl}/client/getSiteSettings`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch site settings. Status: ${response.status}`);
    }

    const data = await response.json();
    return (
      <>
      <Nexttitle data={data}/>
      <Tracker data={data}userData={userData}/>
        {children}
      </>
    );
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }
}
