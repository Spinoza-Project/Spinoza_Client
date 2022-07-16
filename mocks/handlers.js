import { rest } from 'msw';

export const handlers = [
  rest.get('/api/me', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        success: true,
        message: '유저 조회 성공',
        data: 'USER',
      })
    );
  }),
  // Handles a POST /login request
  rest.post('/api/user/signin', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get('/api/user/plant', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        success: true,
        message: '식물 조회 성공',
        data: {
          plants: [
            {
              plantId: '62a7267557e6ac739cb8dc93',
              name: '복순이',
              image:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/peach.jpeg',
              weather: '구름 적음',
              temperature: 26,
            },
            {
              plantId: '62b559b45ebbcc992e03e399',
              name: '영감탱이',
              image:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/persimmon.jpeg',
              weather: '구름 적음',
              temperature: 28,
            },
          ],
        },
      })
    );
  }),

  rest.get('/api/plant/:plantId/feed', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        success: true,
        message: '피드 조회 성공',
        data: {
          plantName: '복순이',
          farmName: '샙띠농장 복숭아',
          farmAdress: '경상북도 김천시 농소면 용암리 42-14',
          weather: '구름 적음',
          temperature: 26,
          humidity: 52,
          feeds: [
            {
              feedId: '62b562855ebbcc992e03e40b',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/feed3.jpeg',
              ],
              content:
                '농사짓기 까다로워 갱신할까 하는걸 눈치챘나 보다. 올해는 작년보다 결실이 좋을듯하다. 대부분의 농가가 포기한 품종이라 더 애틋한데 녀석들이 쥔장맘을 몰라주더니 올해는 살짝 기특하다. 애들아 내년엔 좀만 더 힘내자.',
              createdAt: '2021-07-11T14:23:00.000Z',
            },
            {
              feedId: '62b562365ebbcc992e03e40a',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/feed2.jpeg',
              ],
              content: '복순이가 이렇게 변했어요~~^^',
              createdAt: '2021-06-26T12:23:00.000Z',
            },
            {
              feedId: '62a739cb57e6ac739cb8dca9',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/feed1.jpeg',
              ],
              content:
                '적과(알솎기)를 끝내는 동안 제법 컸어요.\n이제 클래식을 들으며, 많이 이뻐해 주고 쓰담쓰담 하면......\n곧 탐스럽게 익어갑니다. ♪♬♩',
              createdAt: '2021-06-16T15:32:00.000Z',
            },
          ],
        },
      })
    );
  }),

  rest.get('/api/user/farm', (req, res, ctx) => {
    const fruit = req.url.searchParams.get('fruit');
    const address = req.url.searchParams.get('address');

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        success: true,
        message: '농장 조회 성공',
        data: {
          farms: [
            {
              farmId: '62b55ddf5ebbcc992e03e3eb',
              farmName: '더 착한 사과',
              introduction:
                '저희는 베테랑 사과농사 부부입니다. 과수원 집에서 태어나 사과를 봐오고 평생을 사과농사를 지어가면서 살아왔습니다. 30년 긴 세월의 노하우와 기술력을 바탕으로 직접 기른 사과를 산지 직송으로 보내드리겠습니다.',
              address: '경상북도 영주시 풍기읍 전구리 232-1',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%83%E1%85%A5%E1%84%8E%E1%85%A1%E1%86%A8%E1%84%92%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A1%E1%84%80%E1%85%AA%E1%84%82%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%AE.jpeg',
              ],
            },
            {
              farmId: '62b569915ebbcc992e03e45a',
              farmName: '영주마실',
              introduction:
                '영주마실의 사과밭은 인적이 드문 해발 500m에 위치하여 맑은 공기와 깨끗한 물로 키웁니다. 사질양토로 토질이 좋고 배수가 잘 되어 농산물이 잘 자라며, 특히 사과 맛이 좋기로 유명합니다.',
              address: '경상북도 영주시 풍기읍 소백로 839',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%AE%E1%84%86%E1%85%A1%E1%84%89%E1%85%B5%E1%86%AF%E1%84%89%E1%85%A1%E1%84%80%E1%85%AA%E1%84%82%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%AE.jpeg',
              ],
            },
            {
              farmId: '62b56a1a5ebbcc992e03e45b',
              farmName: '김가네 과일촌',
              introduction:
                '김가네 과일촌은 영주 소백산 주변에 위치, 산지직송으로 매일 좋은 사과를 부담없는 가격으로 나눕니다',
              address: '경상북도 영주시 풍기읍 신재로939번길 20',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%A1%E1%86%B7%E1%84%80%E1%85%A1%E1%84%82%E1%85%A61.png',
              ],
            },
            {
              farmId: '62b56a7c5ebbcc992e03e45c',
              farmName: '이삭농원',
              introduction:
                '좋은 토양과 좋은 햇살과 맑은 물로 자라는 당도 높은 사과를 저온저장하여 안전하게 가정으로 전달해드립니다.',
              address: '경상북도 영주시 풍기읍 366',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A1%E1%86%A8%E1%84%82%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB1.png',
              ],
            },
            {
              farmId: '62b56af55ebbcc992e03e45d',
              farmName: '우리사과농원',
              introduction:
                '경치 좋고 이름난 명산대천 소백산 자락 경북 강소농!! 사과에 진심인 우리사과 농원입니다.',
              address: '경상북도 영주시 풍기읍 1189-24',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/Untitled.png',
              ],
            },
          ],
        },
      })
    );
  }),

  rest.get('/api/user/farm/:farmId', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        success: true,
        message: '농장 조회 성공',
        data: {
          farmId: '62b55ddf5ebbcc992e03e3eb',
          farmName: '더 착한 사과',
          address: '경상북도 영주시 풍기읍 전구리 232-1',
          phoneNumber: '010-8474-5638',
          grade: 4.5,
          tours: [
            {
              _id: '62cd40ee964b830218d7a6fc',
              tourName: '부석사',
              tourImage:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%AE%E1%84%89%E1%85%A5%E1%86%A8%E1%84%89%E1%85%A1.jpeg',
            },
            {
              _id: '62cd420d964b830218d7a6fd',
              tourName: '국립산림치유원',
              tourImage:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%85%E1%85%B5%E1%86%B8%E1%84%89%E1%85%A1%E1%86%AB%E1%84%85%E1%85%B5%E1%86%B7%E1%84%8E%E1%85%B5%E1%84%8B%E1%85%B2%E1%84%8B%E1%85%AF%E1%86%AB.jpeg',
            },
            {
              _id: '62cd423d964b830218d7a6fe',
              tourName: '소백산',
              tourImage:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%A9%E1%84%87%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A1%E1%86%AB.jpeg',
            },
            {
              _id: '62cd426a964b830218d7a6ff',
              tourName: '소수서원',
              tourImage:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%A9%E1%84%89%E1%85%AE%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AF%E1%86%AB.jpeg',
            },
          ],
          fruitTypes: [
            {
              _id: '62a71fbc57e6ac739cb8dc80',
              name: '후지',
              information:
                '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
              image:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
            },
            {
              _id: '62a722b157e6ac739cb8dc81',
              name: '아오이',
              information:
                '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
              image:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
            },
            {
              _id: '62a722ee57e6ac739cb8dc82',
              name: '홍로',
              information:
                '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
              image:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
            },
          ],
          hashTags: ['가족끼리', '당도맛집', '마운틴뷰', '힐링갬성'],
          introduction:
            '저희는 베테랑 사과농사 부부입니다. 과수원 집에서 태어나 사과를 봐오고 평생을 사과농사를 지어가면서 살아왔습니다. 30년 긴 세월의 노하우와 기술력을 바탕으로 직접 기른 사과를 산지 직송으로 보내드리겠습니다.',
          images: [
            'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%83%E1%85%A5%E1%84%8E%E1%85%A1%E1%86%A8%E1%84%92%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A1%E1%84%80%E1%85%AA%E1%84%82%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%AE.jpeg',
            'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/1.jpg',
          ],
        },
      })
    );
  }),
  rest.get('/api/farm/:farmId/reservation', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        success: true,
        message: '농장 예약 정보 조회 성공',
        data: {
          reservations: [
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a71fbc57e6ac739cb8dc80',
                name: '후지',
                information:
                  '우리가 가장 흔히 보고 맛보는 사과는 후지(부사) 사과\n숙기 10월 하순\n과중 320g 내외\n당도 14.6 브릭스(brix)\n산도 0.38%\n육질이 연하고 치밀\n상온 저장 90일\n저온 저장 180일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/huji.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722b157e6ac739cb8dc81',
                name: '아오이',
                information:
                  '쓰가루라고도 불리는 상큼한 사과\n숙기 8월 하순\n과중 280g 내외\n당도 13.5 브릭스(brix)\n산도 0.34%\n단단한 과육과 사각거리는 식감\n상온 저장 5일\n저온 저장 20일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/aoi.png',
              },
              price: 3400,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: true,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: false,
            },
            {
              fruitType: {
                _id: '62a722ee57e6ac739cb8dc82',
                name: '홍로',
                information:
                  '가장 관리가 힘든만큼, 고품질 사과 획득 가능한 홍로\n숙기 9월 상순\n과중 340g 내외\n당도 15 브릭스(brix)\n산도 0.31%\n조직이 치밀하고 과즙이 많은 편\n상온 저장 30일\n저온 저장 60일',
                image:
                  'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/hongro.png',
              },
              price: 3200,
              reserved: false,
            },
          ],
        },
      })
    );
  }),
  rest.get('/api/user/farm/tour', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        success: true,
        message: '관광지 정보 조회 성공',
        data: {
          tours: [
            {
              _id: '62cd40ee964b830218d7a6fc',
              tourName: '부석사',
              tourImage:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%AE%E1%84%89%E1%85%A5%E1%86%A8%E1%84%89%E1%85%A1.jpeg',
              distance: 22.7,
            },
            {
              _id: '62cd420d964b830218d7a6fd',
              tourName: '국립산림치유원',
              tourImage:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%80%E1%85%AE%E1%86%A8%E1%84%85%E1%85%B5%E1%86%B8%E1%84%89%E1%85%A1%E1%86%AB%E1%84%85%E1%85%B5%E1%86%B7%E1%84%8E%E1%85%B5%E1%84%8B%E1%85%B2%E1%84%8B%E1%85%AF%E1%86%AB.jpeg',
              distance: 2,
            },
            {
              _id: '62cd423d964b830218d7a6fe',
              tourName: '소백산',
              tourImage:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%A9%E1%84%87%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A1%E1%86%AB.jpeg',
              distance: 9.5,
            },
            {
              _id: '62cd426a964b830218d7a6ff',
              tourName: '소수서원',
              tourImage:
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%A9%E1%84%89%E1%85%AE%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AF%E1%86%AB.jpeg',
              distance: 10.1,
            },
          ],
        },
      })
    );
  }),
  rest.get('/api/farmer/plant/:plantId/feed', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        success: true,
        message: '피드 조회 성공',
        data: {
          userName: '조원빈',
          plantName: '영감탱이',
          plantImage:
            'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/feed5.png',
          farmName: '상주경천곶감농원',
          farmAddress: '경상북도 상주시 이안면 양범리 260-15',
          temperature: 28,
          weather: '☀️',
          humidity: 48,
          feeds: [
            {
              feedId: '62b563a65ebbcc992e03e412',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/feed6.png',
              ],
              content:
                '슬슬 색이 나기 시작합니다^^ 올 가뭄에도 잘 버텨줘서 고마워~~',
              comments: [
                {
                  userName: '더 착한 사과',
                  profileImage:
                    'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/farmer.png',
                  comment: '과일이 잘 익었죠?',
                },
                {
                  userName: '더 착한 사과',
                  profileImage:
                    'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/farmer.png',
                  comment: '얼른 보내드리고 싶네요 ㅎㅎ.',
                },
                {
                  userName: '조원빈',
                  profileImage:
                    'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/user.png',
                  comment: '감사합니다 ㅎㅎ.',
                },
              ],
              createdAt: '2021-09-02T12:35:00.000Z',
            },
            {
              feedId: '62b563755ebbcc992e03e411',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/feed5.png',
              ],
              content:
                '예전에 비해 결실은 좋으나 또 솎아내려니 마음이 아프다.... 자란 아이들을 손으로 따내는것이 얼마나 힘든 일인지~~ 떨어진 감 만큼이나 남은 아이들이 잘 자라길^^',
              comments: [],
              createdAt: '2021-08-12T16:23:00.000Z',
            },
            {
              feedId: '62b563305ebbcc992e03e410',
              images: [
                'https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/feed4.png',
              ],
              content:
                '감 나무가 이렇게 심겼습니다~~^^\n다른 분들이 사랑해주시는 만큼... 잘 자라지 않을까....\n기대를 해 봅니다',
              comments: [],
              createdAt: '2021-04-10T14:23:00.000Z',
            },
          ],
        },
      })
    );
  }),
];
