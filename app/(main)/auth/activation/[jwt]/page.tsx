import { activateUser } from "@/app/api/user/route";
import { verifyJwt } from "@/lib/jwt";

interface Props {
  params: {
    jwt: string;
  };
}

const ActivationPage = async ({ params }: Props) => {
  const result = await activateUser(params.jwt);
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {result === "userNotExist" ? (
        <p className="text-muted text-2xl">The user does not exist</p>
      ) : result === "alreadyActivated" ? (
        <p className="text-muted text-2xl">The user is already activated</p>
      ) : result === "success" ? (
        <p className="text-primary text-2xl">
          Success! The user is now activated
        </p>
      ) : (
        <p className="text-muted text-2xl">Oops! Something went wrong!</p>
      )}
    </div>
  );
};

export default ActivationPage;