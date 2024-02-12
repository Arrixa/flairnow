import { Skeleton } from "../components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center my-4 gap-2'>
      <h1 className="text-muted text-2xl">Loading...</h1>
      <p>Please wait while the content is loading.</p>
      <Skeleton className="w-[100px] h-[20px] rounded-full" />

    </div>
  );
};

export default LoadingPage;