// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  // Handles a POST /login request
  rest.post('/api/user/signin', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get('/api/plant', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        plants: [
          {
            plantId: '62a7267557e6ac739cb8dc93',
            name: '튼튼이',
            image:
              'https://cdn.todayan.com/news/photo/202101/404295_304385_2042.jpg',
            weather: '맑음',
            temperature: 24,
          },
          {
            plantId: '24a7267557e6ac739cqsdc93',
            name: '튼튼이2',
            image:
              'https://cdn.todayan.com/news/photo/202101/404295_304385_2042.jpg',
            weather: '맑음',
            temperature: 24,
          },
          {
            plantId: '24a7267557e6ac739cqc93',
            name: '튼튼이3',
            image:
              'https://cdn.todayan.com/news/photo/202101/404295_304385_2042.jpg',
            weather: '맑음',
            temperature: 24,
          },
        ],
      })
    );
  }),

  rest.get('/api/plant/:plantId/feed', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        feeds: [
          {
            feedId: '62a739cb57e6ac739cb8dca9',
            images: [
              'http://www.kns.tv/news/photo/201906/571875_449298_3733.jpg',
            ],
            content: '사과가 예쁘게 익었어요.',
            createdAt: '2001-02-01T15:00:00.000Z',
          },
          {
            feedId: '62a7390a57e6ac739cb8dc9d',
            images: [
              'http://www.kns.tv/news/photo/201906/571875_449298_3733.jpg',
            ],
            content: '사과가 예쁘게 익었어요.1',
            createdAt: '2001-01-31T15:00:00.000Z',
          },
          {
            feedId: '62a739c557e6ac739cb8dca8',
            images: [
              'http://www.kns.tv/news/photo/201906/571875_449298_3733.jpg',
            ],
            content: '사과가 예쁘게 익었어요.2',
            createdAt: '2001-01-30T15:00:00.000Z',
          },
        ],
      })
    );
  }),
];
