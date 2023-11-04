// const getParseUrl = (URL: string | { pathname: string | undefined; query: any }): string => {
//   let parseUrl: string | { pathname: string, query: any } = URL;
//
//   if (URL && typeof URL === "object") {
//     parseUrl = URL?.pathname.toString();
//     Object.keys(URL.query).forEach((key) => {
//       if (typeof parseUrl === "string") {
//         parseUrl = parseUrl.replace(`[${key}]`, URL.query[key]);
//       }
//     });
//   }
//
//   return parseUrl.toString();
// };
//
// export default getParseUrl;