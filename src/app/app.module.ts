import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RouterModule, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';
import { DataModule } from './data.module';
import { RateLimiterModule, RateLimiterGuard } from 'nestjs-rate-limiter'

@Module({
	imports: [
		MongooseModule.forRoot(
			'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
		),
		RateLimiterModule.register({
			keyPrefix: 'global',
            points: 15, // total of 15 points
            pointsConsumed: 1, // consume 1 point per request
			duration: 20, // 20 seconds
			blockDuration: 60, // Block for 1 minute, if consumed more than 15 points per 20 seconds
			errorMessage: 'Too many requests sent. Please try again later.',
		}),
		AuthModule,
		DataModule,
		RouterModule.register([
			{
				path: 'auth',
				module: AuthModule,
			},
			{
				path: 'data',
				module: DataModule,
			},
		]),
	],
	controllers: [],
	providers: [{provide: APP_GUARD,
		useClass: RateLimiterGuard,}],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(TokenMiddleware)
			.exclude({ path: 'api/auth/login', method: RequestMethod.POST }, { path: 'api/auth/register', method: RequestMethod.POST })
			.forRoutes('*');
	}
}
