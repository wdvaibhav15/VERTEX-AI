// import proxy from "express-http-proxy";

// export const proxyWithHeader = (serviceUrl) => {
//   return proxy(serviceUrl, {
//     proxyReqOptDecorator: (proxyReqOptions, req) => {
//       if (req.user) {
//         proxyReqOptions.headers["x-user-id"] = req.user?._id;
//       }
//       return proxyReqOptions;
//     },
//   });
// };

import proxy from "express-http-proxy";

export const proxyWithHeader = (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOptions, req) => {

            if (req.user) {
                proxyReqOptions.headers["x-user-id"] =
                    String(req.user._id);
            }

            return proxyReqOptions;
        },
    });
};
