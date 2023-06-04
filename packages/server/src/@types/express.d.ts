export { }
declare global {
    namespace Express {
        // Inject additional properties on express.Request
        interface Request {
            /**
             * This request's secret.
             * Optionally set by cookie-parser if secret(s) are provided.  Can be used by other middleware.
             * [Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) can be used to add your own properties.
             */
            userData?: object;
        }
    }
}
