// Example: ?search=shirt
// const searchQuery = ref('' as string);

export function useSearching() {
  const route = useRoute();
  const router = useRouter();
  const { updateProductList } = useProducts();

  const searchQuery = useState<string>('searchQuery', () => '');

  searchQuery.value = route.query.search as string;

  function getSearchQuery() {
    return route.query.search as string;
  }

  function setSearchQuery(search: string) {
    searchQuery.value = search;
    router.push({ query: { ...route.query, search: search || undefined } });
    setTimeout(() => { updateProductList() }, 50);
  }

  function clearSearchQuery() {
    setSearchQuery('');
  }

  const isSearchActive = computed(() => { return !!searchQuery.value });

  function searchProducts(products: any[]) {
    const query = getSearchQuery();
    return query ? products.filter((product: any) => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    }) : products;
  }

  return { getSearchQuery, setSearchQuery, clearSearchQuery, searchProducts, isSearchActive };
}
