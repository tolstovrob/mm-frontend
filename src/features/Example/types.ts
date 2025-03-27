/**
 * `types.ts` contains all types that feature uses. This could be store types, data from server, etc.
 * It would be better if you use some kind of special naming there.
 * Next you will be given some interface examples that you probably should follow (or shouldn't, it's up to you)
 */

import { z } from 'zod';

/**
 * This is example interface for POST requests data
 */
export interface ExamplePost {
	message: string;
	value: number;
}

/**
 * You also can store corresponding validation schemas there
 */
export const ExamplePostSchema = z.object({
	message: z.string().nonempty(),
	value: z.number(),
});

/**
 * Notice that if you expect a server returning something back, you probably SHOULD name interfaces
 * like Something<Method><Request/Response>
 */

/**
 * This is example interface for GET requests data which WE pass to server
 */
export interface ExampleGetRequest {
	message: string;
}

/**
 * This is example interface for GET requests data which given US by server
 */
export interface ExampleGetResponse {
	value: number;
}
