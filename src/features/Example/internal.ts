/**
 * `internal.ts` contains feature functions and handlers that are NOT being exported into the app.
 * You should store functions that you're using in `api.ts` there.
 * It would be better if you use some kind of special naming there, just not to be confused.
 * Functions, that are exported, mainly should return promises. Incapsulated should be mostly sync
 */

import { ExamplePostSchema, type ExamplePost } from './types';

/**
 * Try to describe each function for a good measure
 * @param example data to validate
 * @returns `true` if example satisfies ExamplePost validation schema
 */
export const validateExample = (example: ExamplePost): boolean => !ExamplePostSchema.parse(example);
