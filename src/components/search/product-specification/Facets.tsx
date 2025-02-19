import { KlevuFilterResultOptions } from "@klevu/core";
import { useFacetClicked, usePageContext } from "../ProductsProvider";

export type Facet = {
  name: string;
  value: string;
  count: number;
  selected: boolean;
}

const Facets = () => {
  const pageContext = usePageContext();
  const facetClicked = useFacetClicked();
  let filters = pageContext?.filters as KlevuFilterResultOptions[] || [];
  filters = filters.filter((filter) => filter.key !== "category" && filter.key !== "klevu_price");

  return (
    <div className="flex flex-col gap-2">
      {filters.map((filter) => 
        <>
        <h3 className="mt-5 pb-1 font-semibold">{filter.label}</h3>
          {filter?.options?.map((item) => (
            <div className="flex items-center" key={item.value}>
              <label className="mr-2 cursor-pointer">
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => facetClicked(filter, item)}
                />
                {item.name}
              </label>
              <div className="ml-1 flex items-center justify-center rounded-md border bg-gray-200 px-1.5 py-0.5 text-xs font-medium">
                {item.count}
              </div>
            </div>
          ))}
        </>
      )}
      
    </div>
  );
};

export default Facets;
