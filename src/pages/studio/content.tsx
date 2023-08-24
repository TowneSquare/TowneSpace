import Tabs from "./tabs";

const Content = () => {
   return (
      <div className="flex flex-col md:flex-row gap-2 md:gap-12 items-center">
         {Links.map((link, index) => (
            <a href={link.href} target="blank">
               <span className="underline">
                  {link.label}
               </span>
            </a>
         ))}
         <div className="flex gap-2 md:gap-12">
            <button className="w-[100px] md:w-[205px] px-1 h-[57px] bg-gray-dark-1 text-gray-light-1 font-bold">
               Create
            </button>
            <button className="w-[100px] md:w-[205px] px-1 h-[57px] bg-gray-dark-1 text-gray-light-1 font-bold">
               Migrate NFTs
            </button>
         </div>
      </div>
   )
}

const Links = [
   {
      href: "",
      label: "Help Center"
   },
   {
      href: "",
      label: "Guides"
   }
]
export default Content;