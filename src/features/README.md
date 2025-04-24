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

export type ILoginForm = ILoginRequest;

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
import { abortableFetch, backend, validateData, type MutationResponse } from '$shared/api';
import { createMutation } from '@tanstack/svelte-query';
import type { ILoginRequest, ILoginResponse } from './types';
import { loginSchema } from './internal';

export const login = (loginData: ILoginForm): MutationResponse<ILoginRequest, ILoginResponse> => {
	return createMutation({
		mutationKey: ['auth', 'login'],
		mutationFn: async () => {
			const loginRequest = validateData(loginSchema, loginData);

			return abortableFetch(backend('/login'), {
				method: 'POST',
				body: JSON.stringify(loginRequest),
			});
		},
	});
};
```

Здесь всё тривиально: мы создаём мутацию для POST запроса, внутри которой мы валидируем форму и отправляем на сервер данные. Функция `abortableFetch` корректно отправит запрос за нас, обработает все ошибки и возьмёт на себя управление timeout.

> Обратите внимание, что для GET запросов мы используем запросы (`query`), а для остальных (где нам нужно отправить какую-то информацию на сервер) &mdash; мутации (`mutation`)

### Запросы

Аналогично опишем и запрос &mdash; скажем, для получения сессии.

```ts
import {
	abortableFetch,
	backend,
	type QueryResponse,
} from '$shared/api';
import { createQuery } from '@tanstack/svelte-query';
import type { ISessionResponse } from './types';

export const session = (): QueryResponse<ISessionResponse> => {
	return createQuery({
		queryKey: ['auth', 'session'],
		queryFn: async () => abortableFetch(backend('/session'));
	});
};
```

В данном примере всё абсолютно аналогично, за исключением того, что мы возвращаем запрос, а не мутацию.

### Мутация или запрос?

Главное отличие мутации от запроса: первые можно динамически &laquo;толкать&raquo;, чтобы они отправляли что-то на сервер. В случае с отправкой формы это наиболее удобный способ. Когда нам нужно (скажем, `onsubmit`) мы просто "толкнём" мутацию вызовом `$sender.mutate(formState)` и данные полетят на сервер.

## Шаг 3: внутренние функции

Реализуем функцию для валидации формы входа с помощью Zod. Для этого в `internal.ts` пропишем:

```ts
const loginSchema = z.object({
	email: z.string().email('Некорректный адрес').nonempty('Это обязательное поле'),
	password: z.string().nonempty('Это обязательное поле'),
});
```

Мы создаём Zod-схемы для валидации, которые будут передаваться во внутреннюю функцию `validateData`. Она вернёт данные обратно, но если валидация не пройдена, то перед этим выкинет ошибку с кодом `VALIDATION_ERROR`, которую можно отследить

## Шаг 4: хранилища?

Если тебе нужно хранить какие-то данные, то можешь создать `store.ts`, экспортировать его через `index.ts` и внутри него реализовать `writable` или другое реактивное хранилище. Примеров не будет, надеюсь, ты справишься сам!

## Шаг 5: использование

В любом компоненте мы можем использовать нашу фичу так:

```html
<script lang="ts">
	import * as Auth from '$features/Auth';

	let formState: Auth.ILoginRequest = $state({
		email: '',
		password: '',
	});

	const sender = Auth.login(formState);

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		await $sender.mutateAsync(formState);
	};
</script>

<form onsubmit="{handleSubmit}">
	<!-- реализация формы -->
</form>
```

Главное не забывать использовать руны из Svelte 5.

## Вопросы?

Если что-то непонятно &mdash; открой issue с меткой `question` или свяжись со мной по социальным сетям в моём профиле.
