import { ShopperProduct } from "@elasticpath/shopper-common";
import { KlevuConfig, KlevuFetch, similarProducts, search, trendingProducts, KlevuEvents, KlevuRecord, KlevuSearchOptions, FilterManager, sendSearchEvent, listFilters, applyFilterWithManager, recentlyViewed, newArrivals, kmcRecommendation } from "@klevu/core";

export const initKlevu = () => {
    KlevuConfig.init({
      url: process.env.NEXT_PUBLIC_KLEVU_SEARCH_URL!,
      apiKey: process.env.NEXT_PUBLIC_KLEVU_API_KEY!,
    });
  }
  
  export const fetchSimilarProducts = async (id: string) => {
    const res = await KlevuFetch(
      similarProducts([id])
    );
  
    return res.apiResponse.queryResults;
  };
  
  export const fetchAllProducts = async () => {
    const res = await KlevuFetch(
      search(
        '*', // Using '*' to match all products
        {
          typeOfRecords: ['KLEVU_PRODUCT'],
          limit: 1000,
          offset: 0,
        }
      )
    );
  
    return res.apiResponse.queryResults;
  };

  export const fetchProducts = async (searchSettings: Partial<KlevuSearchOptions>, query?: string, manager?: FilterManager) => {
    const res = await KlevuFetch(
      search(
        query || '*',
        searchSettings,
        sendSearchEvent(),
        listFilters({ 
          rangeFilterSettings: [
            {
              key: "klevu_price",
              minMax: true,
            },
          ],
          ...(manager ? { filterManager: manager } : {}),
        }),
        // @ts-ignore
        manager ? applyFilterWithManager(manager) : () => null
      )
    );
  
    return res;
  };
  
  export const fetchFeatureProducts = async () => {
    const trendingId = "trending" + new Date().getTime()
  
    const res = await KlevuFetch(
      trendingProducts(
        {
          limit: 4,
          id: trendingId,
        },
      )
    )
    return res.queriesById(trendingId);
  };

  export const fetchRecentlyViewed = async () => {
    const res = await KlevuFetch(
      recentlyViewed()
    );
  
    return res.apiResponse.queryResults;
  };

  export const fetchNewArrivals = async () => {
    const res = await KlevuFetch(
      newArrivals()
    );
  
    return res.apiResponse.queryResults;
  };

  export const fetchKMCRecommendations = async (id: string) => {
    const res = await KlevuFetch(
      kmcRecommendation(id)
    );
  
    return res.apiResponse.queryResults;
  };
  
  export const sendClickEv = async(product: any) => {
    KlevuEvents.searchProductClick({
      product,
      searchTerm: undefined,
    })
  }
  
  export const transformRecord = (record: KlevuRecord): ShopperProduct => {
    const main_image: any = {
      link: {
        href: record.image
      }
    };
    
    return {
      main_image,
      response: {
        meta: {
          display_price: {
            without_tax: {
              amount: Number(record.price),
              formatted: record.price,
              currency: record.currency
            },
            with_tax: {
              amount: Number(record.price),
              formatted: record.price,
              currency: record.currency
            },
          },
          original_display_price: {
            without_tax: {
              amount: Number(record.salePrice),
              formatted: record.price,
              currency: record.currency
            },
            with_tax: {
              amount: Number(record.salePrice),
              formatted: record.price,
              currency: record.currency
            },
          }
        },
        attributes: { 
          name: record.name,
          description: record.shortDesc
        } as any,
        id: record.id
      }
    } as ShopperProduct
  }
  
  initKlevu();