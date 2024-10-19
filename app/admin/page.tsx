import Profile from "@/components/Pages/Profile";

export default async function Admin() {

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold ">Update Profile</h1>
      <Profile/>
    </div>
  )
}
