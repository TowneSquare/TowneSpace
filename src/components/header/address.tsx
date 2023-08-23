const Address = () => {

   return (
      <div className="flex items-center gap-2">
         <div className="w-8 h-8 rounded-full bg-gray-light-1 border border-gray-light-3">
         </div>
         <span className="font-bold">{wallet}</span>
      </div>
   )
}
const wallet = "0xa41..b809";
export default Address;