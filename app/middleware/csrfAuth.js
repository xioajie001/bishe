module.exports = (opption, app) => {
    return async function csrfAuth(ctx,next){
        ctx.state.csrf = ctx.csrf;
        await next();
    }
}