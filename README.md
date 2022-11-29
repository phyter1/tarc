# TARC
Fuck untyped routes
___
## Typed API Routes & Clients for Next.js
___

Allows you to define typed API routes with typesafe handler and client definitions and react context/hooks


### Setup

#### src/shared/api.ts
```ts
import { Router } from '@phyter/tarc/router'
import { z } from 'zod'

const ApiRouter = Router({
    contextShape: z.object({
        user: z.object({
            id: z.string(),
            email: z.string()
        })
    }),
    apiUrl: '/api'
})

export default ApiRouter
```

#### src/shared/routes/task.ts
```ts
import ApiRouter from '../api'
import { z } from 'zod'

export const CreateTaskRoute = ApiRouter.route({
    method: 'post',
    path: '/task/create',
    inputShape: z.object({
        name: z.string(),
        complete: z.boolean()
    }),
    outputShape: z.object({
        id: z.string().optional()
    })
})

export const ReadTaskRoute = ApiRouter.route({
    method: "get",
    path: "/task/read",
    inputShape: z.object({
        id: z.string(),
    }),
    outputShape: z.object({
        id: z.string(),
        name: z.string(),
        complete: z.boolean(),
    }),
});

export const ReadAllTasksRoute = ApiRouter.route({
    method: "get",
    path: "/task/read-all",
    inputShape: z.object({}),
    outputShape: z.object({
        tasks: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            complete: z.boolean(),
        })
        ),
    }),
});

export const UpdateTaskRoute = ApiRouter.route({
    method: "post",
    path: "/task/update",
    inputShape: z.object({
        id: z.string(),
        name: z.string(),
        complete: z.boolean(),
    }),
    outputShape: z.object({
        success: z.boolean(),
    }),
});

export const DeleteTaskRoute = ApiRouter.route({
    method: "post",
    path: "/task/delete",
    inputShape: z.object({
        id: z.string(),
    }),
    outputShape: z.object({
        success: z.boolean(),
    }),
});
```

#### src/server/routes/task.ts
```ts
import 
```