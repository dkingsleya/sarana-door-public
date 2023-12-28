import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import ModifyItem from "@/components/modifyItem";

export default async function Home() {
  // Get user session token
  const session = await getServerSession(authOptions);

  return (
    <main className="overflow-auto">
      <div className="container xl:mt-[10%] md:mt-[15%] mt-[30%] m-auto">
        {session && (
          <>
            <section>
              <div className="container h-full flex justify-center items-center">
                <div className="w-full bg-white px-8">
                  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-8 m-auto">
                    <div className="flex flex-col items-center pb-10">
                      <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={session.user?.image ? session.user?.image : ""}
                        alt={session.user?.name ? session.user?.name : "admin"}
                      />
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {session.user?.name ? session.user?.name : "ADMIN"}
                      </h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Admin</span>
                      <div className="flex mt-4 space-x-3 md:mt-6">
                        <Link
                          href="/api/auth/signout"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          {"Sign Out"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-10 p-10">
              <ModifyItem jenis1={"pintu"} jenis2={"jendela"} jenis3={"aksesoris"} />
            </section>
          </>
        )}
        {!session && (
          <div className="container h-full flex justify-center items-center">
            <div className="w-full bg-white px-8">
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-8 m-auto">
                <div className="flex flex-col items-center pb-10">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Sign in to Continue
                  </h5>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    <Link
                      href="/api/auth/signin"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {"Sign In"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
