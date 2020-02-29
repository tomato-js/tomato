import { ObjectType, forEach } from "@tomato-js/shared";

interface StringifyOptions {
  encode: boolean;
}
export default function stringify(
  queryObj: ObjectType<string | number>,
  options: StringifyOptions = {
    encode: true
  }
) {
  let queryString: string = "";
  forEach(queryObj, (queryKey, queryValue) => {
    if (options.encode) {
      queryValue = encodeURIComponent(queryValue);
      queryKey = encodeURIComponent(queryKey);
    }
    queryString = queryString ? `${queryString}&${queryKey}=${queryValue}` : `${queryKey}=${queryValue}`;
  });
  return queryString;
}
