import { useAuthContext } from "@/context/AuthContext";

const Home = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="text-4xl text-red-900 w-full ">
      Home{JSON.stringify(authUser)}
    </div>
  );
};

export default Home;
