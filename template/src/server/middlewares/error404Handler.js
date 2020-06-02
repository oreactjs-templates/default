import runtimeConfig from "../../runtimeConfig";

export default async (req, res, next) => {
    if(req.url === '/graphql'){
        return next();
    }
    return res.redirect(runtimeConfig.ROUTE_404)
}
