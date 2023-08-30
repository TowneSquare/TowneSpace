import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import Filter from "./filter";
import CollectionPanel from "./collection_panel";
import { toggleTraitPanel } from "../../../state/dialog";

interface Props {
}
const ReplacePanel: React.FC<Props> = ({ }) => {
   const dispatch = useAppDispatch();
   const isOpen = useAppSelector(state => state.dialogState.bTraitPanel);
   const [filter, setFilter] = useState(0);
   const currentTrait = useAppSelector(state => state.tokensState.currentTrait);

   return (
      <div className={`absolute w-[50vw] min-h-[100vh] right-0 top-0 bg-gray-dark-2 ${isOpen ? "block" : "hidden"}`}>
         <div className="mx-2 py-4 flex justify-center">
            <div className="absolute left-4 w-10 h-10 cursor-pointer" onClick={() => dispatch(toggleTraitPanel(false))}>
               <p className="text-2xl font-semibold">×</p>
            </div>
            <p className="text-xl font-semibold">
               {currentTrait?.name}
            </p>
         </div>
         <Filter filter={filter} setFilter={setFilter} />
         <CollectionPanel />
      </div>
   )
}

export default ReplacePanel;