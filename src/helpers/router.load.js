/**Generate by ASGENS
 *@author Charlietyn
 *@date Thu Dec 30 02:00:31 GMT-05:00 2021
 *@time Thu Dec 30 02:00:31 GMT-05:00 2021
 */
export default function getRoutes(requireModule) {
    let routes = [];
    Object.keys(requireModule).forEach((fileName) => {
        const elem = requireModule[fileName];
        routes = routes.concat(elem.default);
    });
    return routes;
}
