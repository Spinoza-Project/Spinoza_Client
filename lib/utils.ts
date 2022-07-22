export const ROCOMAND_COLORS = ['#F1F6BA', '#E7BE75', '#D66F52', '#B85455'];
export const EMPTY_COLOR = '#0ea5e9';

export const getGeoJSONDataBySGG = async () => {
  return await (await fetch('/geojson/LARD_ADM_SECT_SGG_47-2.json')).json();
};
export const getGeoJSONDataByUMD = async () => {
  return await (await fetch('/geojson/LSMD_ADM_SECT_UMD_47.json')).json();
};

export const getPlanti = async () => {
  // return await (await fetch('/analysis/planti.json')).json();
  return await (await fetch('/analysis/final1.json')).json();
};
export const getSugar = async () => {
  return await (await fetch('/analysis/sugar.json')).json();
};
export const getProduct = async () => {
  return await (await fetch('/analysis/product.json')).json();
};
