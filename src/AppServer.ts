import express, { Application } from 'express';
import { Container, attachControllers, ERROR_MIDDLEWARE } from 'src/modules/app';
import { Controllers } from 'src/contollers';
import { getInjectables } from './modules/common/decorators/injectable';
import morgan from 'morgan';

const app: Application = express()

export class AppServer {

    private static PORT: number = 7134;

    private LoadConfig() {
        app.use(express.json())
            .use(morgan('dev'));
        this.InitializeControllers()
    }
    private async InitializeControllers() {
        this.RegisterDependencies()
        await attachControllers(app, [...Controllers]);
    }
    private RegisterDependencies() {
        //  DO NOT EDIT THIS CONFIG UNTILL YOU KNOW WHAT IS THIS DOING
        const injectables = getInjectables()
        const t = [...injectables].map((Injectable: any) => {
            if (((Injectable.name).toLowerCase()).endsWith("errorhandler") || ((Injectable.name).toLowerCase()).endsWith("errorhandlers")) {
                return {
                    provide: ERROR_MIDDLEWARE,
                    useClass: Injectable
                }
            }
            return {
                provide: Injectable,
                useClass: Injectable
            }
        })

        Container.provide(t);
    }
    private static async start() {
        this.prototype.LoadConfig()

        app.listen(AppServer.PORT, () => {
            console.info(`[${process.pid}]`, 'Standalone Express Server is running on port', AppServer.PORT);

        });
    }
    static async run() {
        AppServer.start().catch(console.error);
    }
}
