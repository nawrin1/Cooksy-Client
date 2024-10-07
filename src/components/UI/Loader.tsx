/* eslint-disable prettier/prettier */

import { Watch } from "react-loader-spinner";



export default function Loader() {
  return (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Watch
  visible={true}
  height="80"
  width="80"
  radius="48"
  color="#e3913f"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  );
}
