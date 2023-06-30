# AI 면접관 웹 애플리케이션

AI 면접관은 이력서를 토대로 면접 질문을 생성하는 인공지능을 기반으로 한 웹 애플리케이션입니다. 사용자는 자신의 이력서를 PDF 형식으로 업로드하면, AI가 해당 이력서의 직업을 분석하고, 그에 따른 커스텀 면접 질문을 제공합니다. 이는 머신 러닝 모델인 DaBInch를 활용하여 가능합니다.

## 기능

1. **PDF 이력서 업로드**: 사용자는 자신의 이력서를 PDF 형식으로 업로드할 수 있습니다.
2. **이력서 분석**: 업로드된 이력서는 PDF-parse 라이브러리를 통해 텍스트로 변환되고,
   davinch 모델을 활용하여 이력서의 직업을 분석합니다.
3. **면접 질문 생성**: 이력서의 내용을 바탕으로, chatGPT 3.5모델을 이용해 질문을 생성합니다
   AI는 커스텀 면접 질문 1개와 해당 직종의 필수 질문 1개, 총 2개의 질문을 생성합니다.
4. **답변에 대한 꼬리물기 질문 생성** 로직 3에서 생성된 질문에 대한 답변을 사용자가 답변할 수 있습니다
   AI는 해당 답변을 바탕으로 집요하고 상세한 질문을 추가로 할 수 있으며 해당 답변이 만족스럽다면 다른 질문을 이어갑니다

## 사용 방법

1. 웹사이트에 접속합니다: [AI 면접관](https://ai-interviewer-blond.vercel.app/)
2. '이력서 업로드' 버튼을 클릭하여 이력서(PDF 파일)를 업로드합니다.
3. 잠시 기다린 후, AI가 제공하는 면접 질문을 확인합니다.


![화면 기록 2023-06-15 오후 12 16 21](https://github.com/yunsoShin/AI_Interviewer/assets/91814941/d2d3dddd-339b-4e39-8d0e-929cfe5e7886)


## 기대 효과

이 웹 애플리케이션을 사용하면 사용자는 자신이 준비해야 할 면접 질문에 대한 힌트를 얻을 수 있습니다.
이는 특히 면접 준비 과정에서 도움이 될 수 있으며, 사용자가 자신의 경력과 능력을 어떻게 면접관에게 전달할지 더 잘 계획할 수 있게 도와줍니다. 또한, 이 웹 애플리케이션은 사용자가 면접 질문에 대한 자신만의 답변을 준비하고 연습하는 데 도움을 줄 수 있습니다.

무엇보다 이 AI는 면접관 입장에서도 사용할 수 있게 설정되었으며 매우 탈월한 질문들을 작성해줍니다

## 꼬리물기 질문 구현
사용자가 면접관과 대화를 진행하며 심도깊은 대화를 이어나갈수있는 기능을 구현하였습니다
![화면 기록 2023-06-18 오후 1 21 53](https://github.com/yunsoShin/AI_Interviewer/assets/91814941/05951742-10a7-40eb-90dd-42b909c9a4e8)


## Toast를 활용한 PDF검증



## 핵심 로직

### 왜 Next.js인가?

리액트의 문법을 사용하고, node.js의 모듈과 API를 이용할수있다는점과 edge runtime을 지원하는점이 매력적이였습니다
무엇보다 이번 프로젝트의 의의가 AI API를 경험해보고, next.js에 익숙해지는것이 목표였던 첫번째
next.js 프로젝트였기때문에 필수적이였습니다.

### 배포시 Time-Out의 문제점

GPT모델의 답변은 하나하나의 요청에 대한 응답이 10초에서 길면40초로
vercel에서 배포하였을때, pro계정이 아닌경우에는 HTTP 504 error - 타임아웃이 발생하였습니다
해결방안으로 타임아웃이 비교적 더욱 긴 cloudflare(1분여간의 타임아웃)을 사용하거나,
AWS의 API게이트웨이와 Lambda를 사용하는것이였습니다

하지만 cloudflare의 사용은 next.js 13버전에서의 서버쪽 로직들을 모두 edge런타임에서 실행해야하는 문제점으로,
node.js의 파일시스템로직을 사용하는 convertpdf.js 로직에서는 적합하지 않았습니다

(https://yunsoo1.tistory.com/169)

AWS는 학습곡선도 학습곡선이지만 해킹의 Lambda의 사용은 실시간으로 통신되는 로직에는 맞지않겠다고 판단하였습니다
무엇보다 S3와 AWS의 부가적인 기능을 사용하는것이 아니라면 굳이 다른 대안이 있음에도 유료로 전환되거나
프로젝트를 방치하였을시 생기는 해킹의 우려도 있었습니다, 저는 프로젝트를 생성하고 어느정도 안정화되면 방치하고싶었습니다.

때문에 공식문서를 찾고 github의 퍼블릭된 vercel공식계정에서의 openai를 참고하여
답변들을 stream형식으로 변경하고 청크단위로 디코딩,인코딩하는 로직을 추가하여야했습니다.

(https://yunsoo1.tistory.com/171)

### firebase와의 연동

현재 이력서를 업로드하는 로직을 구현하였고

추후에 기능을 추가하여
좋아요 버튼을 생성함으로인해 사용자가 어떤 질문을 마음에 들어하는지, 해당 질문에 대한 답변과 선호도를 파악할 수 있도록하였습니다
