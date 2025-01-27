import { useSelector } from "react-redux"
import { RootState } from "../types/types"

const Note = () => {
  const message = useSelector((state:RootState) => state.users.message)

  return (
    <div className="w-full h-[30px] flex justify-center rounded-sm top-[100px] my-1 overflow-hidden">
        <div className=" w-3/4 ">
        <p className='text-center  text-primary font-bold '>{message}</p>
        </div>
   </div>
  )
}

export default Note
