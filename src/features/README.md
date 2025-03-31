# Слой features &mdash; пошаговое руководство

Итак, представим, что нам нужно создать фичу Auth для авторизации (в шаблоне она уже частично реализована)

Мы знаем, что на сервере есть следующие эндпоинты:

| Эндпоинт    | Описание                                     | Метод |
| ----------- | -------------------------------------------- | ----- |
| `/session`  | Получить данные авторизованного пользователя | GET   |
| `/login`    | Войти в аккаунт пользователя                 | POST  |
| `/register` | Зарегистрировать новый аккаунт               | POST  |
| `/logout`   | Выйти из аккаунта                            | POST  |

Наша цель &mdash; сделать удобную обертку через Tanstack Query.

## Шаг 0: подготовка окружения

В папке `src/features/Auth` создадим файлы `index.ts`, `api.ts`, `internal.ts` и `types.ts`.

В `index.ts` экспортируем нашу фичу:

```ts
export * from './api';
export * from './types';
```

На ошибки пока что не обращаем внимания &mdash; наши файлы пустуют лишь временно.

Заметим, что мы **не экспортируем** `internal.ts` &mdash; в этом файле код, который используется только внутри `Auth` и не показан внешнему миру.

## Шаг 1: объявление интерфейсов и типов

В файле `types.ts` объявим типы, которые нам необходимы в процессе работы с фичей. Например:

```ts
export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginResponse {
	status: number;
	message: string;
}

export interface IRegisterRequest {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export interface IRegisterForm extends IRegisterRequest {
	confirmPassword: string;
}

export interface IRegisterResponse {
	status: number;
	message: string;
}
```

Хорошей практикой именования интерфейсов являются правила:

- Всё что уходит на сервер оканчивается на `Request`, всё что приходит к нам с сервера &mdash; на `Response`.
- Интерфейсы начинаются с буквы `I`. Это гарантирует отсутствие путаницы и конфликтов имён при большом экспорте.

Однако это лишь рекомендации и окончательный выбор за тобой, самурай ;)

## Шаг 2: реализация API

В файле `api.ts` мы должны описать **синхронные** функции, возвращающие **асинхронные очереди/мутации**. Всё немного сложно на первый взгляд, но я уверен, что ты поймёшь после того как взглянешь на пример:

### Мутации

```ts
import { backend, type MutationResponse } from '$shared/api';
import { createMutation } from '@tanstack/svelte-query';
import type { ILoginRequest, ILoginResponse } from './types';
import { validateLoginForm, validateRegisterForm } from './internal';

const loginMutationFn = async (
	formData: ILoginRequest,
): Promise<ILoginResponse | Record<string, string>> => {
	const validationResult = validateLoginForm(formData);

	if ('status' in validationResult && validationResult.status === 'OK') {
		return await fetch(backend('/login'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		})
			.then((data) => data.json())
			.then((data) =>
				data?.status === 200
					? (data as unknown as ILoginResponse)
					: 'errors' in data
						? (data.errors as Record<string, string>)
						: { global: 'Неизвестная ошибка, попробуйте позже' },
			);
	} else {
		return validationResult;
	}
};

export const login = (
	formData: ILoginRequest,
): MutationResponse<ILoginRequest, ILoginResponse | Record<string, string>> => {
	return createMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: () => loginMutationFn(formData),
	});
};
```

Давай разбираться: ключевая функция здесь `login`. Именно с ней мы будем работать внутри интерфейса. В ней мы создаём мутацию для работы с POST запросом на `/login`

> Обратим внимание на то, что для POST запросов используются мутации, а для GET &mdash; очереди.

Итак, рассмотрим её спецификацию. Она принимает в себя данные формы для входа. Так получилось, что они совпали с итоговым запросом, что в общем случае не обязательно (пример &mdash; регистрация). Возвращает же она специальный тип `MutationResponse<TRequest, TResponse>`. Это лишь высокоуровневая обёртка над типами Tanstack Query. По сути она означает, что в мутации мы отправляем что-то типа `TRequest`, а на выходе получаем ответ типа `TResponse`.

При вызове функции мы создадим и вернём мутацию Tanstack Query, в которой вызываем **асинхронную функцию мутации**. Чтобы не загромождать код, вынесем её в отдельную функцию `loginMutationFn`.

Внутри неё мы валидируем форму (код валидации лежит в `internal.ts` &mdash; посмотрим его позже). Если она не прошла валидацию, тьо вернём `Record<string, string>`, где ключ это поле формы, а значение это описание ошибки. В случае если она прошла валидацию, то делаем запрос на сервер. Функция `backend` вспомогательная &mdash; в неё мы можем передать эндпоинт, а она соберёт полный URL из переменных окружения (смотри .env.example). После отправки запроса мы конвертируем данные в JSON, а затем начинаем изучать ответ сервера:

- Если сервер отправил нам что-то со статусом 200 &mdash; это хорошо, давайте явно приведём к типу `ILoginResponse` и вернём это в поле `data` соответствующей мутации.

- Иначе, сервер пришлёт нам объект с ошибками. Их мы преобразуем и для единообразия вернём как `Record<string, string>`, где ключ это поле формы, а значение это описание ошибки.

- Иначе, если нет поля с ошибками или положительного ответа, то мы не можем это никак обработать, поэтому как в прошлом случае вернём `Record<string, string>` с полем `global` &mdash; соответствующее поле для ошибок можно поместить где-нибудь под формой и отправлять туда общие ошибки.

### Очереди

Аналогично опишем и очередь &mdash; скажем, для получения сессии. Конечно, лучше это вынести в фичу User, как это сделано в шаблоне, но не будем заморачиваться над такими вещами в примере:

```ts
import { createQuery } from '@tanstack/svelte-query';
import { backend, type QueryResponse } from '$shared/api';
import type { IUserCredentials } from './types';

export const session = (): QueryResponse<IUserCredentials> => {
	return createQuery({
		queryKey: ['user', 'session'],
		queryFn: async () => {
			return await fetch(backend('/session')).then(
				(data) => data.json() as unknown as IUserCredentials,
			);
		},
	});
};
```

В данном примере всё абсолютно аналогично, за исключением того, что мы возвращаем очередь, а не мутацию.

### Мутация или очередь?

Главное отличие мутации от очереди: первые можно динамически "толкать", чтобы они отправляли что-то на сервер. В случае с отправкой формы это наиболее удобный способ. Когда нам нужно (скажем, `onsubmit`) мы просто "толкнём" мутацию вызовом `$sender.mutate(formState)` и данные полетят на сервер.

## Шаг 3: внутренние функции

Реализуем функцию для валидации формы входа с помощью Zod. Для этого в `internal.ts` пропишем:

```ts
const loginSchema = z.object({
	email: z.string().email('Некорректный адрес').nonempty('Это обязательное поле'),
	password: z.string().nonempty('Это обязательное поле'),
});

export const validateLoginForm = (formData: ILoginRequest): Record<string, string> => {
	const result = loginSchema.safeParse(formData);

	if (!result.success) {
		const errors: Record<string, string> = {};
		result.error.errors.forEach((err) => (errors[err.path[0]] = err.message));
		return errors;
	}

	return { status: 'OK' };
};
```

Мы создаём Zod-схемы для валидации, а затем экспортируем функцию для проверки на соответствие этой схеме. В случае ошибки мы получим `Record<string, string>`, где ключ это поле формы, а значение это описание ошибки. В случае успеха мы также получим `Record<string, string>`, но с одним полем `{ status: 'OK' }`.

## Шаг 4: хранилища?

Если тебе нужно хранить какие-то данные, то можешь создать `store.ts`, экспортировать его через `index.ts` и внутри него реализовать `writable` или другое реактивное хранилище. Примеров не будет, надеюсь, ты справишься сам!

## Вопросы?

Если что-то непонятно &mdash; открой issue с меткой `question` или свяжись со мной по социальным сетям в моём профиле.
