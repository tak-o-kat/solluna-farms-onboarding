export default function error() {
  return (
    <div className="min-h-screen flex flex-row justify-center items-center -mt-20 p-3 sm:p-24">
      <span className="flex text-2xl gap-2 p-3 border-r-2">500</span>
      <span className="flex text-sm sm:text-base p-3 ">
        Server side error occurred
      </span>
    </div>
  );
}
