# 프리온보딩 마지막 과제

> 두둥!

| 이름      | Git                                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
| 👑 임거정 | https://github.com/rieulp/pre-onboarding-7th-3-2/tree/dev                                                             |
| 박라영    | https://github.com/rieulp/pre-onboarding-7th-3-2/tree/dev                                                             |
| 고현수    | https://github.com/movie42/pre-onboarding-7th-3-2-4                                                                   |
| 김하영    | https://github.com/seul-dev/pre-onboarding-7th-3-2-4                                                                  |
| 박호준    | https://github.com/ganeodolu/wanted-pre-onboarding-course/tree/main/pre-onboarding-7th-3-2-4-investment-administrator |
| 이슬      | https://github.com/seul-dev/pre-onboarding-7th-3-2-4                                                                  |
| 조윤정    | https://github.com/yunjjeongjo/pre-onboarding-7th-3-2-4                                                               |
| 최지영    | https://github.com/ohtmm/pre-onboarding-7th-3-2_investment-service-admin                                              |

# 환경 설정 및 실행 방법

## 클라이언트 환경설정

**NodeJS 16.14.2에서 실행하는 것을 권장합니다.**

### 설치 및 실행

## 서버 환경설정

## 설치 및 실행

**npm run gen 하면 초기화하면 db 정보가 초기화 되기 때문에 로그인을 하기 위해서 반드시 http://localhost:4000/users/signup 을 포스트맨과 같은 어플리케이션으로 수행해주시기 바랍니다. 만약 npm run gen을 하지 않으면 아래 있는 아이디와 비밀번호를 사용해서 로그인이 가능합니다.**

서버와 클라이언트를 각각 설치 및 실행해야합니다.

1. 서버 설치 및 실행 방법

```shell
// 루트 폴더에서
cd server && npm ci
npm start
```

2. 클라이언트 설치 및 실행 방법

```shell
// 루트 폴더에서
cd preface && npm ci
npm run dev
```

3. 로그인 정보

```json
{
  "email": "newface@dco.com",
  "password": "123qwe!@"
}
```

# 디렉토리 구조

```jsx
├── preface
│   ├── components
│   │   ├── Layout
│   │   ├── account
│   │   ├── accountDetail
│   │   │   └── hook
│   │   └── auth
│   │       └── hook
│   ├── lib
│   │   ├── api
│   │   │   └── instance
│   │   ├── assets
│   │   ├── constants
│   │   ├── data
│   │   ├── interfaces
│   │   ├── types
│   │   └── utils
│   ├── model
│   ├── pages
│   │   ├── account
│   │   ├── api
│   ├── public
│   ├── react-query
│   │   ├── hooks
│   ├── service
│   ├── styles
└── server
```

폴더 구조는 최대한 관련성이 높은 것끼리 묶으려고 하였습니다.

- pages
  - 페이지 폴더에는 페이지 역할을 하는 컴포넌트만 있습니다. nextJS는 페이지로 라우팅을 하기 때문에 의식적으로 더 페이지만 모을 수 있었습니다.
- components
  - 컴포넌트는 페이지 안에서 필요한 컴포넌트들이 모여있습니다. 페이지와 떨어져있다는 단점이 있지만 컴포넌트끼리 묶여 있기 때문에 폴더 이름을 정하여서 찾기에 더 용이한 구조로 만들었습니다.
  - hooks가 포함되어있는데 컴포넌트와 결합이 강한 훅은 각 기능별 components안에 묶어 넣었습니다.
- utils
  - utils는 타입, 유틸 함수, 전역 훅, 상태 등을 넣어 관리하였습니다.
- model
  - 모델은 서버에서 넘어오는 데이터의 모형을 모아 놓은 폴더입니다.

# BEST PRACTICE

## 1. NextJS Client 서버 및 쿠키 사용

- NextJS Client 서버를 사용해서 CORS 문제를 해결하였습니다. CORS는 브라우저에서 일어나는 문제이기 때문에 NEXTJS 클라이언트 서버를 프록시 서버로 사용하여 CORS를 해결하였습니다.
- 넘어오는 accessToken을 Cookie에 저장하여 사용했습니다. API 서버에서 검증을 하여 COOKIE가 없을 경우 login으로 redirect하기 때문에 클라이언트에서 인가 구현을 하지 않아도 된다는 장점이 있었습니다.

## 2. 계좌 목록 - 필터링, 페이지네이션, 검색 구현

- 필터링은 URL의 쿼리스트링을 상태로 사용하여 구현하였습니다. 새로고침을 하여도 브라우저의 URL은 그대로 남아있기 때문에 필터링 값이 그대로 유지될 수 있습니다.
- 페이지네이션은 응답 헤더에 'x-total-count'값을 사용해서 페이지수를 계산해 구현했습니다.

## 3. 계좌 상세 - 생성, 수정 구현

- 포맷을 변경하는 각각의 함수들을 기능별로 나누어 utils 함수에 넣은 뒤 재사용성을 높였습니다.
- constant로 되어있는 여러 값들을 Object.entries를 사용해 배열로 만들어 각각 key value로 수정 옵션들로 만들어 중복되는 코드를 줄였습니다

# 문제 해결

## 1. Hydration Error

- [Hydration failed because the initial UI does not match what was rendered on the server.](https://github.com/wanted-pre-onboarding-fe-7th-team-4/pre-onboarding-7th-3-2-4/issues/31)
- NextJS에서 SSR 기능을 사용할 때, Hydration 에러가 발생했습니다. 서버와 클라이언트의 UI 불일치가 발생하기 때문에 에러가 나는 것으로 파악했습니다. 해결은 결국 SSR을 사용하지 않고 useEffect를 사용하여 에러를 없애는 방법으로 해결했습니다. 이슈를 참조하면 더 자세한 내용을 보실 수 있습니다.

## 2. 많은 쿼리스트링 입력 부분들

- axiosConfig에서 params로 입력받아 엔드포인트 부분은 path만 입력받고 그 뒤 쿼리스트링 부분은 axios기능으로 입력해 코드의 가독성을 높였습니다.

```ts
  async getUserAccounts<TData>(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<TData>> {
    const response = await this.api.get<TData>("accounts", {
      ...config
    });

    return response;
  }

  async () => {
    await userService.searchUser<{ users: UserModel[] }>({ params: { id } }),
  }
```

## 3. 서비스를 구현하여 클라이언트 api 서버와 서버측 api 호출 우아하게 하기

- [AuthService.ts](preface/service/AuthService.ts)
- [AccountService.ts](preface/service/AccountService.ts)
- [UserService.ts](preface/service/UserService.ts)

코드를 구현할 때, 저희는 서버 요청을 두번 보내야 하므로 코드를 작성해야하는 양이 더 많았습니다. 하지만 관심사를 인증, 인가, 계좌 목록 조회, 사용자 목록 조회 등으로 나누어서 서비스를 만들었습니다. 서버에 요청을 할 때, 클라이언트 api와 서버 api 호출에 다 이용 가능하도록 서비스를 만들었습니다. 덕분에 각 파트에서 필요한 부분만 가져와 그냥 사용만 하면 되기 때문에 개발 시간이 더 줄어들 수 있었습니다. (하지만 과제가 왜 끝이 안나지...)
