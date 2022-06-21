export const getGeoJSONData = async () => {
  return await (await fetch('/LARD_ADM_SECT_SGG_47-2.json')).json();
};

export const getProduct = async () => {
  return await (await fetch('/product.json')).json();
};
